import type { NormalizedCacheObject } from "@apollo/client";
import { ApolloClient, InMemoryCache, createHttpLink, from, fromPromise } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import type { AuthToken } from "@libs/model";
import type { CookieContext } from "@libs/utils-client";
import { type AuthCookieContext, authCookieKey, getCurrentToken, getNewToken, removeToken, setToken } from "./token";

const REFRESH_TOKEN_OPERATION = "refreshTokens";

export const AuthTokenManager = {
  authCookieKey,
  getCurrentToken,
  getNewToken,
  removeToken,
  setToken,
};

export const getApolloClient = (uri?: string, cookieContext?: CookieContext) => {
  let client: ApolloClient<NormalizedCacheObject>;

  const { req } = cookieContext || {};
  const ssrMode = !!req || typeof window === "undefined";
  const graphqlUrl = uri ?? process.env.NEXT_PUBLIC_SERVER_URL?.concat("/graphql");
  const context: AuthCookieContext = { authCookieKey, ...cookieContext };

  // Apollo Client Links
  const serverLink = createHttpLink({
    uri: graphqlUrl,
    fetchOptions: {
      mode: "cors",
    },
    fetch,
  });

  const authLink = setContext((_, { headers }) => {
    const { accessToken } = getCurrentToken(context);
    if (!accessToken) {
      return {
        headers,
      };
    }

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    const graphQLError = graphQLErrors?.[0];
    if (!graphQLError) return;

    const { accessToken, refreshToken } = getCurrentToken(context);
    const errorCode = graphQLError.extensions.code as string;

    const handleRemoveToken = () => {
      removeToken(context);
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    };

    if ((!accessToken && !refreshToken) || operation.operationName === REFRESH_TOKEN_OPERATION) return;
    if (!(accessToken && refreshToken) || errorCode === "UNAUTHENTICATED") {
      handleRemoveToken();
      const oldHeaders = operation.getContext()?.headers || {};
      operation.setContext({
        headers: {
          ...oldHeaders,
          authorization: "",
        },
      });
      return forward(operation);
    }

    /*
      Apollo refresh Token 새로고침 로직
      https://community.apollographql.com/t/refreshing-access-and-refresh-tokens-via-apollo-in-react/1440/5
    */
    if (["TOKEN_EXPIRED_ERROR", "UNAUTHORIZED"].includes(errorCode)) {
      return fromPromise(
        getNewToken(client, refreshToken).catch(() => {
          handleRemoveToken();
          return undefined;
        }),
      )
        .filter((value) => Boolean(value))
        .flatMap((token) => {
          const newToken = token as AuthToken;
          setToken(newToken, context);
          const oldHeaders = operation.getContext()?.headers || {};
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `Bearer ${newToken.accessToken}`,
            },
          });
          return forward(operation);
        });
    }
  });

  client = new ApolloClient({
    ssrMode,
    link: from([authLink, errorLink, serverLink]),
    cache: new InMemoryCache(),
  });

  return client;
};

export const getGraphqlClient = (uri?: string, cookieContext?: CookieContext) => {
  return getApolloClient(uri, cookieContext);
};
