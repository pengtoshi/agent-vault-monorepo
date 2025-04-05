import { useLazyQuery } from "@apollo/client";
import type { GQLOptions } from "../../client/graphql";
import { gql } from "../__generated__/index";

export const findAllChains = gql(/* GraphQL */ `
  query FindAllChains {
    findAllChains {
      ...Chain
    }
  }
`);

export const useLazyFindAllChains = (options?: GQLOptions<typeof findAllChains>) => {
  return useLazyQuery(findAllChains, {
    ...options,
  });
};
