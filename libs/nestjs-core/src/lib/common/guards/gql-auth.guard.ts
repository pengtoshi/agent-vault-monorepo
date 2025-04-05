import type { ExecutionContext } from "@nestjs/common";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { ErrorMessage } from "@libs/constants";
import { TokenExpiredError } from "@libs/model";

const { MSG_TOKEN_EXPIRED } = ErrorMessage;

@Injectable()
export class GqlAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  override getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  override handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    if (err || !user) {
      // Throw an exception based on either "info" or "err" arguments
      if (info && info?.message === "jwt expired") throw new TokenExpiredError(MSG_TOKEN_EXPIRED);
      else throw err || new UnauthorizedException(ErrorMessage.MSG_UNAUTHORIZED);
    }
    return user;
  }

  override canActivate(context: ExecutionContext) {
    const req = this.getRequest(context);
    return super.canActivate(context);
  }
}
