/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment Chain on ChainInfo {\n    chainId\n    name\n  }\n\n  fragment Token on TokenInfo {\n    id\n    address\n    chainId\n    chain {\n      ...Chain\n    }\n    name\n    symbol\n    decimals\n    logoUrl\n    price\n    createdAt\n    updatedAt\n  }\n": typeof types.ChainFragmentDoc,
    "\n  fragment User on UserInfo {\n    address\n    role\n    status\n    nonce\n    createdAt\n    updatedAt\n  }\n": typeof types.UserFragmentDoc,
    "\n  mutation RefreshTokens($input: AuthTokenInput!) {\n    refreshTokens(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.RefreshTokensDocument,
    "\n  mutation RequestLogin($input: UserInput!) {\n    requestLogin(input: $input) {\n      ...User\n    }\n  }\n": typeof types.RequestLoginDocument,
    "\n  mutation VerifyLogin($input: VerifyUserInput!) {\n    verifyLogin(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.VerifyLoginDocument,
    "\n  query FindUser {\n    findUser {\n      ...User\n    }\n  }\n": typeof types.FindUserDocument,
};
const documents: Documents = {
    "\n  fragment Chain on ChainInfo {\n    chainId\n    name\n  }\n\n  fragment Token on TokenInfo {\n    id\n    address\n    chainId\n    chain {\n      ...Chain\n    }\n    name\n    symbol\n    decimals\n    logoUrl\n    price\n    createdAt\n    updatedAt\n  }\n": types.ChainFragmentDoc,
    "\n  fragment User on UserInfo {\n    address\n    role\n    status\n    nonce\n    createdAt\n    updatedAt\n  }\n": types.UserFragmentDoc,
    "\n  mutation RefreshTokens($input: AuthTokenInput!) {\n    refreshTokens(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.RefreshTokensDocument,
    "\n  mutation RequestLogin($input: UserInput!) {\n    requestLogin(input: $input) {\n      ...User\n    }\n  }\n": types.RequestLoginDocument,
    "\n  mutation VerifyLogin($input: VerifyUserInput!) {\n    verifyLogin(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.VerifyLoginDocument,
    "\n  query FindUser {\n    findUser {\n      ...User\n    }\n  }\n": types.FindUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment Chain on ChainInfo {\n    chainId\n    name\n  }\n\n  fragment Token on TokenInfo {\n    id\n    address\n    chainId\n    chain {\n      ...Chain\n    }\n    name\n    symbol\n    decimals\n    logoUrl\n    price\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment Chain on ChainInfo {\n    chainId\n    name\n  }\n\n  fragment Token on TokenInfo {\n    id\n    address\n    chainId\n    chain {\n      ...Chain\n    }\n    name\n    symbol\n    decimals\n    logoUrl\n    price\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment User on UserInfo {\n    address\n    role\n    status\n    nonce\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment User on UserInfo {\n    address\n    role\n    status\n    nonce\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RefreshTokens($input: AuthTokenInput!) {\n    refreshTokens(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshTokens($input: AuthTokenInput!) {\n    refreshTokens(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RequestLogin($input: UserInput!) {\n    requestLogin(input: $input) {\n      ...User\n    }\n  }\n"): (typeof documents)["\n  mutation RequestLogin($input: UserInput!) {\n    requestLogin(input: $input) {\n      ...User\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VerifyLogin($input: VerifyUserInput!) {\n    verifyLogin(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyLogin($input: VerifyUserInput!) {\n    verifyLogin(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FindUser {\n    findUser {\n      ...User\n    }\n  }\n"): (typeof documents)["\n  query FindUser {\n    findUser {\n      ...User\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;