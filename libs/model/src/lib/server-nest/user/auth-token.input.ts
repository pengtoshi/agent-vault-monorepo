import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class AuthTokenInput {
  @Field(() => String, { nullable: true, description: "Access token" })
  @IsString()
  @IsOptional()
  accessToken?: string;

  @Field(() => String, { nullable: true, description: "Refresh token" })
  @IsString()
  @IsOptional()
  refreshToken?: string;
}
