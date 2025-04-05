import { ApolloDriver } from "@nestjs/apollo";
import type { ApolloDriverConfig } from "@nestjs/apollo";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TerminusModule } from "@nestjs/terminus";
import { GqlConfigService, MonitorModule, PrismaModule, config } from "@libs/nestjs-core";
import { AgentModule } from "./agent/agent.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MarketModule } from "./market/market.module";
import { TokenModule } from "./token/token.module";
import { UserModule } from "./user/user.module";
import { BlockchainModule } from "../common/blockchain/blockchain.module";
import { DefillamaApiModule } from "../common/defillama-api/defillama-api.module";
import { JwtStrategy } from "../common/strategies/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    {
      ...HttpModule.registerAsync({
        useFactory: () => ({
          timeout: 120000,
          maxRedirects: 5,
        }),
      }),
      global: true,
    },
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),

    // Utils
    TerminusModule,
    MonitorModule,

    // API
    DefillamaApiModule,

    // App
    PrismaModule,
    TokenModule,
    UserModule,
    AgentModule,
    MarketModule,
    BlockchainModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, GqlConfigService],
})
export class AppModule {}
