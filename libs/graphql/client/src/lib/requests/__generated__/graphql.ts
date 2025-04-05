/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: { input: any; output: any; }
};

/** Agent Model */
export type AgentInfo = {
  /** Agent EOA address */
  address: Scalars['String']['output'];
  /** Created date */
  createdAt: Scalars['DateTime']['output'];
  /** Agent description */
  description: Scalars['String']['output'];
  /** Agent ID */
  id: Scalars['String']['output'];
  /** Agent name */
  name: Scalars['String']['output'];
  /** Agent private key */
  privateKey: Scalars['String']['output'];
  /** Agent prompt */
  prompt: Scalars['String']['output'];
  /** Last updated date */
  updatedAt: Scalars['DateTime']['output'];
};

export type AuthToken = {
  /** Access token */
  accessToken: Scalars['JWT']['output'];
  /** Refresh token */
  refreshToken: Scalars['JWT']['output'];
};

export type AuthTokenInput = {
  /** Access token */
  accessToken?: InputMaybe<Scalars['String']['input']>;
  /** Refresh token */
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};

/** 체인 정보 */
export type ChainInfo = {
  /** 체인 ID */
  chainId: Scalars['Int']['output'];
  /** 생성 일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 이름 */
  name: Scalars['String']['output'];
  /** 수정 일시 */
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateAgentInput = {
  /** Chain ID */
  chainId: Scalars['Int']['input'];
  /** Agent description */
  description: Scalars['String']['input'];
  /** Agent name */
  name: Scalars['String']['input'];
  /** Agent prompt */
  prompt: Scalars['String']['input'];
};

export type Mutation = {
  createAgent: AgentInfo;
  refreshTokens: AuthToken;
  requestLogin: UserInfo;
  verifyLogin: AuthToken;
};


export type MutationCreateAgentArgs = {
  input: CreateAgentInput;
};


export type MutationRefreshTokensArgs = {
  input: AuthTokenInput;
};


export type MutationRequestLoginArgs = {
  input: UserInput;
};


export type MutationVerifyLoginArgs = {
  input: VerifyUserInput;
};

export type Query = {
  findAllAgents: Array<AgentInfo>;
  findAllTokens: Array<TokenInfo>;
  findAllUsers: Array<UserInfo>;
  findTokenByAddress: TokenInfo;
  findUser: UserInfo;
  getAgent: AgentInfo;
};


export type QueryFindTokenByAddressArgs = {
  address: Scalars['String']['input'];
};


export type QueryGetAgentArgs = {
  id: Scalars['String']['input'];
};

/** 사용자 역할 */
export type Role =
  | 'ADMIN'
  | 'USER'
  | 'WIZ';

/** 사용자 상태 */
export type Status =
  | 'ACTIVE'
  | 'DELETE'
  | 'INACTIVE';

/** 토큰 정보 */
export type TokenInfo = {
  /** 토큰 주소 */
  address: Scalars['String']['output'];
  chain: ChainInfo;
  /** 체인 ID */
  chainId: Scalars['Int']['output'];
  /** 생성 일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 자리수 */
  decimals: Scalars['Int']['output'];
  /** 아이디 */
  id: Scalars['ID']['output'];
  /** 로고 URL */
  logoUrl: Scalars['String']['output'];
  /** 이름 */
  name: Scalars['String']['output'];
  /** 가격 */
  price: Scalars['Float']['output'];
  /** 심볼 */
  symbol: Scalars['String']['output'];
  /** 수정 일시 */
  updatedAt: Scalars['DateTime']['output'];
};

/** User Model */
export type UserInfo = {
  /** Wallet Address */
  address: Scalars['String']['output'];
  /** Created At */
  createdAt: Scalars['DateTime']['output'];
  /** Nonce for Login */
  nonce?: Maybe<Scalars['String']['output']>;
  /** Role */
  role: Role;
  /** Status */
  status: Status;
  /** Updated At */
  updatedAt: Scalars['DateTime']['output'];
};

export type UserInput = {
  /** 지갑 주소 */
  address?: InputMaybe<Scalars['String']['input']>;
};

export type VerifyUserInput = {
  /** Message */
  message: Scalars['String']['input'];
  /** Signature */
  signature: Scalars['String']['input'];
};

export type ChainFragment = { chainId: number, name: string };

export type TokenFragment = { id: string, address: string, chainId: number, name: string, symbol: string, decimals: number, logoUrl: string, price: number, createdAt: any, updatedAt: any, chain: { chainId: number, name: string } };

export type UserFragment = { address: string, role: Role, status: Status, nonce?: string | null, createdAt: any, updatedAt: any };

export type RefreshTokensMutationVariables = Exact<{
  input: AuthTokenInput;
}>;


export type RefreshTokensMutation = { refreshTokens: { accessToken: any, refreshToken: any } };

export type RequestLoginMutationVariables = Exact<{
  input: UserInput;
}>;


export type RequestLoginMutation = { requestLogin: { address: string, role: Role, status: Status, nonce?: string | null, createdAt: any, updatedAt: any } };

export type VerifyLoginMutationVariables = Exact<{
  input: VerifyUserInput;
}>;


export type VerifyLoginMutation = { verifyLogin: { accessToken: any, refreshToken: any } };

export type FindUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserQuery = { findUser: { address: string, role: Role, status: Status, nonce?: string | null, createdAt: any, updatedAt: any } };

export const ChainFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Chain"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChainInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ChainFragment, unknown>;
export const TokenFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"chain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Chain"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChainInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<TokenFragment, unknown>;
export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const RefreshTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const RequestLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<RequestLoginMutation, RequestLoginMutationVariables>;
export const VerifyLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<VerifyLoginMutation, VerifyLoginMutationVariables>;
export const FindUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<FindUserQuery, FindUserQueryVariables>;