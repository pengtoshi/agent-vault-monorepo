import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { GraphQLError } from "graphql";
import { ErrorMessage } from "@libs/constants";
import type { AuthToken, JwtPayload } from "@libs/model";
import type { JwtConfig } from "@libs/nestjs-core";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  generateAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  generateRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<JwtConfig>("jwt")!.refreshSecret,
      expiresIn: this.configService.get<JwtConfig>("jwt")!.refreshExpiredTime,
    });
  }

  generateTokens(payload: JwtPayload): AuthToken {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  verifyRefreshToken(refreshToken: string): JwtPayload {
    if (!refreshToken) throw new GraphQLError(ErrorMessage.MSG_INVALID_TOKEN_INPUT);
    return this.jwtService.verify(refreshToken, {
      secret: this.configService.get<JwtConfig>("jwt")!.refreshSecret,
    });
  }
}
