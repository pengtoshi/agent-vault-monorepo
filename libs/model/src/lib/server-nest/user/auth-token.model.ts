import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLJWT } from "graphql-scalars";

@ObjectType()
export class AuthToken {
  @Field(() => GraphQLJWT, { description: "Access token" })
  accessToken!: string;

  @Field(() => GraphQLJWT, { description: "Refresh token" })
  refreshToken!: string;
}
