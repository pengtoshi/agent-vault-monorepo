import type { GQLReturnType } from "../client/graphql";
import type { findUser } from "../requests";

export type UserResponse = NonNullable<GQLReturnType<typeof findUser>["findUser"]>;
