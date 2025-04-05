import { useMutation } from "@apollo/client";
import type { GQLOptions } from "../../client/graphql";
import { gql } from "../__generated__/index";

export const refreshTokens = gql(/* GraphQL */ `
  mutation RefreshTokens($input: AuthTokenInput!) {
    refreshTokens(input: $input) {
      accessToken
      refreshToken
    }
  }
`);

export const useRefreshTokens = (options?: GQLOptions<typeof refreshTokens>) => {
  return useMutation(refreshTokens, {
    ...options,
  });
};
