import { useLazyQuery } from "@apollo/client";
import type { GQLOptions } from "../../client/graphql";
import { gql } from "../__generated__/index";

export const findAgentById = gql(/* GraphQL */ `
  query FindAgentById($id: String!) {
    findAgentById(id: $id) {
      ...Agent
      messages {
        ...Message
      }
    }
  }
`);

export const useLazyFindAgentById = (options?: GQLOptions<typeof findAgentById>) => {
  return useLazyQuery(findAgentById, {
    ...options,
  });
};
