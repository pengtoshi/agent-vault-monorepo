import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import type { AuthToken } from "@libs/model";
import { getCookie, removeCookie, setCookie } from "@libs/utils-client";
import type { CookieContext } from "@libs/utils-client";
import { refreshTokens } from "../requests";

export interface AuthCookieContext extends CookieContext {
  authCookieKey: {
    accessToken: string;
    refreshToken: string;
  };
}

export const authCookieKey = {
  accessToken: "ACCESS_TOKEN",
  refreshToken: "REFRESH_TOKEN",
};

export const getCurrentToken = (cookieContext?: CookieContext) => {
  const context: AuthCookieContext = { authCookieKey, ...cookieContext };

  const accessToken = getCookie(context.authCookieKey.accessToken, context) as string | undefined;
  const refreshToken = getCookie(context.authCookieKey.refreshToken, context) as string | undefined;

  return {
    accessToken,
    refreshToken,
  };
};

export const getNewToken = async (client: ApolloClient<NormalizedCacheObject>, refreshToken: string) => {
  const { data } = await client.mutate({
    mutation: refreshTokens,
    variables: { input: { refreshToken } },
    fetchPolicy: "no-cache",
  });

  const newAccessToken = data?.refreshTokens.accessToken as string;
  const newRefreshToken = data?.refreshTokens.refreshToken as string;

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const removeToken = (cookieContext?: CookieContext) => {
  const context: AuthCookieContext = { authCookieKey, ...cookieContext };
  removeCookie(context.authCookieKey.accessToken, context);
  removeCookie(context.authCookieKey.refreshToken, context);
};

export const setToken = (token: AuthToken, cookieContext?: CookieContext) => {
  const context: AuthCookieContext = { authCookieKey, ...cookieContext };
  setCookie(
    context.authCookieKey.accessToken,
    token.accessToken,
    new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    context,
  );
  setCookie(
    context.authCookieKey.refreshToken,
    token.refreshToken,
    new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    context,
  );
};
