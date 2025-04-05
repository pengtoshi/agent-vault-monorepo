import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import { SiweMessage, generateNonce } from "siwe";
import { ErrorMessage } from "@libs/constants";
import { Role } from "@libs/model";
import type { AuthTokenInput, UserInput, VerifyUserInput } from "@libs/model";
import { PrismaService } from "@libs/nestjs-core";
import { AuthService } from "./auth/auth.service";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async requestLogin(userInput: UserInput) {
    const { address } = userInput;
    if (!address) throw new GraphQLError(ErrorMessage.MSG_INVALID_USER_INPUT);

    const nonce = generateNonce();
    return this.prisma.user.upsert({
      create: {
        address,
        role: Role.USER,
        status: "ACTIVE",
        nonce,
      },
      update: {
        nonce,
      },
      where: { address },
    });
  }

  async verifyLogin({ message, signature }: VerifyUserInput) {
    const siweMessage = new SiweMessage(message);
    const {
      data: { address, nonce },
    } = await siweMessage.verify({ signature });

    const user = await this.prisma.extended.user.findUnique({ where: { address: address.toLowerCase() } });
    if (!user || nonce !== user.nonce) {
      throw new GraphQLError(ErrorMessage.MSG_INVALID_SIGNATURE);
    }

    const { accessToken, refreshToken } = this.authService.generateTokens({ address: user.address });
    const saltOrRounds = 10;
    const encryptedRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);

    await this.prisma.authToken.upsert({
      create: {
        userAddress: user.address,
        accessToken,
        encryptedRefreshToken,
      },
      update: {
        accessToken,
        encryptedRefreshToken,
      },
      where: { userAddress: user.address },
    });

    return { accessToken, refreshToken };
  }

  async refreshTokens({ refreshToken }: AuthTokenInput) {
    if (!refreshToken) throw new GraphQLError(ErrorMessage.MSG_INVALID_TOKEN);
    const { address } = this.authService.verifyRefreshToken(refreshToken);

    const user = await this.prisma.extended.user.findUnique({ where: { address } });
    if (!user) throw new GraphQLError(ErrorMessage.MSG_NOT_FOUND_USER);

    const authToken = await this.prisma.authToken.findUnique({ where: { userAddress: user.address } });
    if (!authToken) throw new GraphQLError(ErrorMessage.MSG_NOT_FOUND_AUTH_TOKEN);

    const isMatch = await bcrypt.compare(refreshToken, authToken.encryptedRefreshToken);
    if (!isMatch) {
      throw new Error();
    }

    const accessToken = this.authService.generateAccessToken({ address });
    await this.prisma.authToken.update({
      where: { userAddress: user.address },
      data: {
        accessToken,
      },
    });
  }

  async findAllUsers() {
    return this.prisma.extended.user.findMany();
  }

  async findUserByAddress(address: string) {
    return this.prisma.extended.user.findUnique({
      where: {
        address,
      },
    });
  }
}
