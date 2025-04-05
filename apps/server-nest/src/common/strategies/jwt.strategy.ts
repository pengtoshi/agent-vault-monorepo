import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { GraphQLError } from "graphql";
import { ExtractJwt, Strategy, type VerifiedCallback } from "passport-jwt";
import { ErrorMessage } from "@libs/constants";
import type { JwtPayload } from "@libs/model";
import type { JwtConfig } from "@libs/nestjs-core";
import { UserService } from "../../app/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<JwtConfig>("jwt")!.secret,
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    // FIXME: Change Patterns - check redis instead of DB
    const user = await this.userService.findUserByAddress(payload.address);
    if (!user) {
      return done(new GraphQLError(ErrorMessage.MSG_NOT_FOUND_USER), false);
    }
    return done(null, user);
  }
}
