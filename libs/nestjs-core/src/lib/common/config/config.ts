import type { ConfigType } from "./config.interface";

export const config = (): ConfigType => ({
  nest: {
    port: parseInt(process.env.PORT!, 10),
    environment: process.env.NEST_ENVIRONMENT!,
    clientDomain: process.env.NOTIFICATION_SITE_DOMAIN!,
    databaseUrl: process.env.PRISMA_DATABASE_URL!,
    readOnlyDatabaseUrl: process.env.READ_ONLY_PRISMA_DATABASE_URL!,
  },
  redis: {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!, 10),
    password: process.env.REDIS_PASSWORD!,
  },
  graphql: {
    playgroundEnabled: process.env.PLAYGROUND_ENABLED! === "true",
    schemaDestination: process.env.SCHEMA_DESTINATION!,
    sortSchema: process.env.SORT_SCHEMA! === "true",
  },
  defiLlama: {
    baseUrl: process.env.DEFILLAMA_BASE_URL!,
    accessKey: process.env.DEFILLAMA_ACCESS_KEY!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiredTime: process.env.JWT_EXPIRES_IN!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    refreshExpiredTime: process.env.JWT_REFRESH_EXPIRES_IN!,
  },
  mixpanel: {
    token: process.env.MIXPANEL_TOKEN!,
    disable: process.env.MIXPANEL_DISABLE === "true" || false,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY!,
  },
  network: {
    rpcUrl: {
      84532: process.env.BASE_SEPOLIA_RPC_URL!,
      11155420: process.env.OPTIMISM_SEPOLIA_RPC_URL!,
    },
  },
});
