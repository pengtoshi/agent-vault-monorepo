import { useMutation } from "@apollo/client";
import type { GQLOptions } from "../../client/graphql";
import { gql } from "../__generated__/index";

export const verifyLogin = gql(/* GraphQL */ `
  mutation VerifyLogin($input: VerifyUserInput!) {
    verifyLogin(input: $input) {
      accessToken
      refreshToken
    }
  }
`);

export const useVerifyLogin = (options?: GQLOptions<typeof verifyLogin>) => {
  return useMutation(verifyLogin, {
    ...options,
  });
};
