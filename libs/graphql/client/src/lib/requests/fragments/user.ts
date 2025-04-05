import { gql } from "../__generated__/index";

export const userFragment = gql(/* GraphQL */ `
  fragment User on UserInfo {
    address
    role
    status
    nonce
    createdAt
    updatedAt
  }
`);
