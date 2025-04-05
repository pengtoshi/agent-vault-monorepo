import { useLazyQuery } from "@apollo/client";
import type { GQLOptions } from "../../client/graphql";
import { gql } from "../__generated__/index";

export const findAllAgents = gql(/* GraphQL */ `
  query FindAllAgents {
    findAllAgents {
      ...Agent
    }
  }
`);

export const useLazyFindAllAgents = (options?: GQLOptions<typeof findAllAgents>) => {
  return useLazyQuery(findAllAgents, {
    ...options,
  });
};
