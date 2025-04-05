import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthToken, AuthTokenInput, JwtPayload, Role, UserInfo, UserInput, VerifyUserInput } from "@libs/model";
import { JwtAuthGuard, Roles, RolesGuard, UserDecoded } from "@libs/nestjs-core";
import { UserService } from "./user.service";

@Resolver(() => UserInfo)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserInfo)
  requestLogin(@Args("input") userInput: UserInput) {
    return this.userService.requestLogin(userInput);
  }

  @Mutation(() => AuthToken)
  verifyLogin(@Args("input") verifyUserInput: VerifyUserInput) {
    return this.userService.verifyLogin(verifyUserInput);
  }

  @Mutation(() => AuthToken)
  refreshTokens(@Args("input") tokenInput: AuthTokenInput) {
    return this.userService.refreshTokens(tokenInput);
  }

  @UseGuards(RolesGuard)
  @Roles([Role.ADMIN])
  @UseGuards(JwtAuthGuard)
  @Query(() => [UserInfo])
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserInfo)
  async findUser(@UserDecoded() payload: JwtPayload) {
    return this.userService.findUserByAddress(payload.address);
  }
}
