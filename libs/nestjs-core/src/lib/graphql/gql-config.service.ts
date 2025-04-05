import type { ApolloDriverConfig } from "@nestjs/apollo";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { GqlOptionsFactory } from "@nestjs/graphql";
import type { GraphqlConfig } from "../common/config/config.interface";

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService) {}

  createGqlOptions(): ApolloDriverConfig {
    const graphqlConfig = this.configService.get<GraphqlConfig>("graphql");
    return {
      autoSchemaFile: graphqlConfig?.schemaDestination,
      sortSchema: graphqlConfig?.sortSchema,
      buildSchemaOptions: {
        numberScalarMode: "integer",
      },
      // subscription
      installSubscriptionHandlers: true,
      playground: graphqlConfig?.playgroundEnabled,
      context: ({ req }) => ({ req }),
    };
  }
}
