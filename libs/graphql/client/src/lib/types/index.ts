import type { GQLReturnType } from "../client/graphql";
import type { findAgentById, findAllAgents, findAllChains, findUser } from "../requests";

export type UserResponse = NonNullable<GQLReturnType<typeof findUser>["findUser"]>;
export type ChainsResponse = NonNullable<GQLReturnType<typeof findAllChains>["findAllChains"]>;
export type AgentsResponse = NonNullable<GQLReturnType<typeof findAllAgents>["findAllAgents"]>;
export type AgentResponse = NonNullable<GQLReturnType<typeof findAgentById>["findAgentById"]>;
