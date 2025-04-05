import { gql } from "../__generated__/index";

export const tokenFragment = gql(/* GraphQL */ `
  fragment Chain on ChainInfo {
    chainId
    name
  }

  fragment Token on TokenInfo {
    id
    address
    chainId
    chain {
      ...Chain
    }
    name
    symbol
    decimals
    logoUrl
    price
    createdAt
    updatedAt
  }
`);
