import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Message Model" })
export class Message {
  @Field(() => String, { nullable: false, description: "Message ID" })
  id!: string;

  @Field(() => String, { nullable: false, description: "Message content" })
  content!: string;

  @Field(() => Date, { nullable: false, description: "Created date" })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: "Last updated date" })
  updatedAt!: Date;
}
