import type { RedisModuleOptions } from "@liaoliaots/nestjs-redis";
import { RedisModule } from "@liaoliaots/nestjs-redis";
import { ApolloDriver } from "@nestjs/apollo";
import type { ApolloDriverConfig } from "@nestjs/apollo";
import { HttpModule } from "@nestjs/axios";
import type { ModuleMetadata } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TerminusModule } from "@nestjs/terminus";
import { Test } from "@nestjs/testing";
import * as dotenv from "dotenv";
import { GqlConfigService, MonitorModule, PrismaModule, config } from "@libs/nestjs-core";
import type { RedisConfig } from "@libs/nestjs-core";
import { AppService } from "~/server-nest/src/app/app.service";
import { TokenModule } from "~/server-nest/src/app/token/token.module";
import { UserModule } from "~/server-nest/src/app/user/user.module";
import { JwtStrategy } from "~/server-nest/src/common/strategies/jwt.strategy";

export async function createServerNestTestingModule(metadata?: ModuleMetadata) {
  dotenv.config({
    path: `apps/server-nest-e2e/.env.testing`,
  });

  const moduleBuilder = Test.createTestingModule({
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

      // Redis & Message Queue
      RedisModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => {
          await ConfigModule.envVariablesLoaded;
          const redis = configService.get<RedisConfig>("redis")!;
          return {
            readyLog: true,
            config: {
              host: redis.host,
              port: redis.port,
              password: redis.password,
              connectTimeout: 60000,
            },
          };
        },
      }),

      GraphQLModule.forRootAsync<ApolloDriverConfig>({
        driver: ApolloDriver,
        useClass: GqlConfigService,
      }),

      // Monitor
      TerminusModule,
      MonitorModule,

      // App
      PrismaModule,
      TokenModule,
      UserModule,

      ...(metadata?.imports ?? []),
    ],
    controllers: metadata?.controllers ?? [],
    providers: [AppService, JwtStrategy, GqlConfigService, ...(metadata?.providers ?? [])],
  });

  const compiled = await moduleBuilder.compile();
  const app = compiled.createNestApplication({ logger: false });
  return app.init();
}
