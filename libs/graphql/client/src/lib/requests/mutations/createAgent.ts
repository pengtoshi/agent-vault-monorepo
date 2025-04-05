import { useMutation } from "@apollo/client";
import type { GQLOptions } from "../../client/graphql";
import { gql } from "../__generated__/index";

export const createAgent = gql(/* GraphQL */ `
  mutation CreateAgent($input: CreateAgentInput!) {
    createAgent(input: $input) {
      ...Agent
    }
  }
`);

export const useCreateAgent = (options?: GQLOptions<typeof createAgent>) => {
  return useMutation(createAgent, {
    ...options,
  });
};
