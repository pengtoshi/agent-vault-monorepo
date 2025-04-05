import { gql } from "../__generated__/index";

export const agentFragment = gql(/* GraphQL */ `
  fragment Agent on AgentInfo {
    id
    address
    vaultAddress
    name
    description
    chainId
    createdAt
    updatedAt
  }

  fragment Message on MessageInfo {
    id
    content
    createdAt
    updatedAt
  }
`);
