import { ErrorMessage } from "@1tx/constants";
import type { Type } from "@nestjs/common";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

const { MSG_NOT_FOUND_TOTAL_COUNT } = ErrorMessage;

export function PaginateResult<T>(ItemType: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PageClass {
    @IsOptional()
    @Field(() => [ItemType], { nullable: true, description: "객체" })
    list?: T[];

    @IsNotEmpty({
      message: MSG_NOT_FOUND_TOTAL_COUNT,
    })
    @IsNumber()
    @Field(() => Int, { description: "총 개수" })
    totalCount!: number;
  }
  return PageClass;
}
