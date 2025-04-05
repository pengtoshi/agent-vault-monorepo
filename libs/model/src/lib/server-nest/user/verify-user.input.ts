import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class VerifyUserInput {
  @Field(() => String, { nullable: false, description: "Message" })
  @IsString()
  message!: string;

  @Field(() => String, { nullable: false, description: "Signature" })
  @IsString()
  signature!: string;
}
