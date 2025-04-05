import { gql } from "../__generated__/index";

export const tokenFragment = gql(/* GraphQL */ `
  fragment Chain on ChainInfo {
    chainId
    name
    blockExplorerUrl
    createdAt
    updatedAt
  }

  fragment Strategy on StrategyInfo {
    address
    chainId
    name
    default
    createdAt
    updatedAt
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
