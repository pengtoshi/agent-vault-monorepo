import { registerEnumType } from "@nestjs/graphql";

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETE = "DELETE",
}

registerEnumType(Status, { name: "Status", description: "사용자 상태" });
