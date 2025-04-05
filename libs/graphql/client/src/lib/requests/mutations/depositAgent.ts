import { useMutation } from "@apollo/client";
import type { GQLOptions } from "../../client/graphql";
import { gql } from "../__generated__/index";

export const depositAgent = gql(/* GraphQL */ `
  mutation DepositAgent($input: DepositAgentInput!) {
    depositAgent(input: $input) {
      ...Agent
    }
  }
`);

export const useDepositAgent = (options?: GQLOptions<typeof depositAgent>) => {
  return useMutation(depositAgent, {
    ...options,
  });
};
