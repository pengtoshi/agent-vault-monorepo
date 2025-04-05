import { useMutation } from "@apollo/client";
import type { GQLOptions } from "../../client/graphql";
import { gql } from "../__generated__/index";

export const requestLogin = gql(/* GraphQL */ `
  mutation RequestLogin($input: UserInput!) {
    requestLogin(input: $input) {
      ...User
    }
  }
`);

export const useRequestLogin = (options?: GQLOptions<typeof requestLogin>) => {
  return useMutation(requestLogin, {
    ...options,
  });
};
