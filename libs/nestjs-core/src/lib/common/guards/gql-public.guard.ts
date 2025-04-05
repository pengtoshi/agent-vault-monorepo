import type { ExecutionContext } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GqlPublic extends AuthGuard("jwt") {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  override handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    return user;
  }
  override canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
