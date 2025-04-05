import { Field, ObjectType } from "@nestjs/graphql";
import { Role } from "../enum/role.enum";
import { Status } from "../enum/status.enum";

@ObjectType({ description: "User Model" })
export class UserInfo {
  @Field(() => String, { nullable: false, description: "Wallet Address" })
  address!: string;

  @Field(() => Role, { nullable: false, description: "Role" })
  role!: keyof typeof Role;

  @Field(() => Status, { nullable: false, description: "Status" })
  status!: keyof typeof Status;

  @Field(() => String, { nullable: true, description: "Nonce for Login" })
  nonce?: string;

  @Field(() => Date, { nullable: false, description: "Created At" })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: "Updated At" })
  updatedAt!: Date;
}
