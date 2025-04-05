import { registerEnumType } from "@nestjs/graphql";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  WIZ = "WIZ",
}

registerEnumType(Role, { name: "Role", description: "사용자 역할" });
