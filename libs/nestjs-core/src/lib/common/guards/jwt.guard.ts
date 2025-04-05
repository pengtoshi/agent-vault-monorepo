import { type ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import type { Observable } from "rxjs";
import { ErrorMessage } from "@libs/constants";
import { TokenExpiredError } from "@libs/model";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  override getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  override handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    if (err || !user) {
      if (info && info?.message === "jwt expired") throw new TokenExpiredError(ErrorMessage.MSG_TOKEN_EXPIRED);
      else throw err || new UnauthorizedException(ErrorMessage.MSG_UNAUTHORIZED);
    }
    return user;
  }
}
