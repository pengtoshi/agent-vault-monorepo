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
  chain?: Maybe<ChainInfo>;
  /** Chain ID */
  chainId: Scalars['Int']['output'];
  /** Created date */
  createdAt: Scalars['DateTime']['output'];
  /** Agent description */
  description: Scalars['String']['output'];
  /** Agent ID */
  id: Scalars['String']['output'];
  messages?: Maybe<Array<MessageInfo>>;
  /** Agent name */
  name: Scalars['String']['output'];
  /** Agent prompt */
  prompt: Scalars['String']['output'];
  /** Last updated date */
  updatedAt: Scalars['DateTime']['output'];
  /** Agent vault address */
  vaultAddress: Scalars['String']['output'];
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
  agents?: Maybe<Array<AgentInfo>>;
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
  /** Agent account address */
  accountAddress: Scalars['String']['input'];
  /** Agent account private key */
  accountPrivateKey: Scalars['String']['input'];
  /** Chain ID */
  chainId: Scalars['Int']['input'];
  /** Agent description */
  description: Scalars['String']['input'];
  /** Agent name */
  name: Scalars['String']['input'];
  /** Agent prompt */
  prompt: Scalars['String']['input'];
  /** Agent vault address */
  vaultAddress: Scalars['String']['input'];
};

/** Message Model */
export type MessageInfo = {
  /** Message content */
  content: Scalars['String']['output'];
  /** Created date */
  createdAt: Scalars['DateTime']['output'];
  /** Message ID */
  id: Scalars['String']['output'];
  /** Last updated date */
  updatedAt: Scalars['DateTime']['output'];
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
  findAgentById: AgentInfo;
  findAllAgents: Array<AgentInfo>;
  findAllChains: Array<ChainInfo>;
  findAllTokens: Array<TokenInfo>;
  findAllUsers: Array<UserInfo>;
  findChainById: ChainInfo;
  findTokenByAddress: TokenInfo;
  findUser: UserInfo;
};


export type QueryFindAgentByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindChainByIdArgs = {
  chainId: Scalars['Int']['input'];
};


export type QueryFindTokenByAddressArgs = {
  address: Scalars['String']['input'];
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

export type AgentFragment = { id: string, address: string, vaultAddress: string, name: string, description: string, chainId: number, createdAt: any, updatedAt: any };

export type MessageFragment = { id: string, content: string, createdAt: any, updatedAt: any };

export type ChainFragment = { chainId: number, name: string, createdAt: any, updatedAt: any };

export type TokenFragment = { id: string, address: string, chainId: number, name: string, symbol: string, decimals: number, logoUrl: string, price: number, createdAt: any, updatedAt: any, chain: { chainId: number, name: string, createdAt: any, updatedAt: any } };

export type UserFragment = { address: string, role: Role, status: Status, nonce?: string | null, createdAt: any, updatedAt: any };

export type CreateAgentMutationVariables = Exact<{
  input: CreateAgentInput;
}>;


export type CreateAgentMutation = { createAgent: { id: string, address: string, vaultAddress: string, name: string, description: string, chainId: number, createdAt: any, updatedAt: any } };

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

export type FindAgentByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FindAgentByIdQuery = { findAgentById: { id: string, address: string, vaultAddress: string, name: string, description: string, chainId: number, createdAt: any, updatedAt: any, messages?: Array<{ id: string, content: string, createdAt: any, updatedAt: any }> | null } };

export type FindAllAgentsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllAgentsQuery = { findAllAgents: Array<{ id: string, address: string, vaultAddress: string, name: string, description: string, chainId: number, createdAt: any, updatedAt: any }> };

export type FindAllChainsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllChainsQuery = { findAllChains: Array<{ chainId: number, name: string, createdAt: any, updatedAt: any }> };

export type FindUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserQuery = { findUser: { address: string, role: Role, status: Status, nonce?: string | null, createdAt: any, updatedAt: any } };

export const AgentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Agent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AgentInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"vaultAddress"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AgentFragment, unknown>;
export const MessageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Message"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MessageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<MessageFragment, unknown>;
export const ChainFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Chain"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChainInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<ChainFragment, unknown>;
export const TokenFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"chain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Chain"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChainInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<TokenFragment, unknown>;
export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const CreateAgentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAgent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAgentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAgent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Agent"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Agent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AgentInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"vaultAddress"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreateAgentMutation, CreateAgentMutationVariables>;
export const RefreshTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const RequestLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<RequestLoginMutation, RequestLoginMutationVariables>;
export const VerifyLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<VerifyLoginMutation, VerifyLoginMutationVariables>;
export const FindAgentByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAgentById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAgentById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Agent"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Agent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AgentInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"vaultAddress"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Message"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MessageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<FindAgentByIdQuery, FindAgentByIdQueryVariables>;
export const FindAllAgentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllAgents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllAgents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Agent"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Agent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AgentInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"vaultAddress"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<FindAllAgentsQuery, FindAllAgentsQueryVariables>;
export const FindAllChainsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllChains"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllChains"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Chain"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Chain"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChainInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<FindAllChainsQuery, FindAllChainsQueryVariables>;
export const FindUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<FindUserQuery, FindUserQueryVariables>;