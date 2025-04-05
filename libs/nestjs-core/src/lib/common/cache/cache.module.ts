/* eslint-disable */
import { InjectRedis } from "@liaoliaots/nestjs-redis";
import { DynamicModule, Module, OnModuleInit } from "@nestjs/common";
import { DiscoveryModule, DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core";
import md5 from "blueimp-md5";
import Redis from "ioredis";
import { dateTimeReviver } from "@libs/utils-server";
import { CACHEABLE, CacheOptions } from "../decorators/cache.decorator";

@Module({
  imports: [DiscoveryModule],
})
export class CacheModule implements OnModuleInit {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  static forRoot(): DynamicModule {
    return {
      module: CacheModule,
      global: true,
    };
  }

  onModuleInit() {
    this.discovery
      .getProviders()
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
      .forEach(({ instance }) => {
        this.metadataScanner.getAllMethodNames(Object.getPrototypeOf(instance)).forEach((methodName) => {
          const methodRef: any = instance[methodName];
          if (methodRef) this.registerCache(instance)(methodName);
        });
      });
  }

  registerCache(instance: any) {
    return (methodName: string | number) => {
      const methodRef: any = instance[methodName];
      const metadata: CacheOptions = this.reflector.get(CACHEABLE, methodRef);
      if (!metadata) return;

      const { ttl = 10800, prefix: customPrefix, key: customKey, keyArgs: customArgs, logger = () => null } = metadata;
      const cacheKeyPrefix = customPrefix || `${instance.constructor.name}:${methodName}:`;
      const originMethod = (...args: unknown[]) => methodRef.call(instance, ...args);

      instance[methodName] = async (...args: unknown[]) => {
        let key;
        if (customArgs && args.length) {
          const initialArgs = new Map();
          for (let i = 0; i < args.length; i++) {
            if (args[i] instanceof Array) {
              initialArgs.set(customArgs[i], args[i]);
            } else if (args[i] instanceof Object) {
              customArgs.forEach((keyField) => this.objectTravel(args[i], keyField, initialArgs));
            } else {
              if (args[i]) initialArgs.set(customArgs[i], args[i]);
            }
          }
          key = customKey || JSON.stringify(Object.fromEntries(initialArgs));
        } else {
          key = customKey || args.length ? md5(JSON.stringify(args)) : null;
        }

        const cacheKeySuffix = key || "";
        const cacheKey = `${cacheKeyPrefix}${cacheKeySuffix}`;
        const cached = await this.redis.get(cacheKey);
        // @ts-ignore
        logger({ cacheKey });

        if (cached) {
          return JSON.parse(cached, dateTimeReviver);
        }

        const data = await originMethod(...args);

        // @ts-ignore
        logger({ data });

        await this.redis.setex(cacheKey, ttl, JSON.stringify(data));

        return data;
      };
    };
  }

  objectTravel(object: any, keyField: string, initialArgs: Map<any, any>) {
    if (!(object instanceof Object)) return;
    if (object[keyField]) {
      initialArgs.set(keyField, object[keyField]);
      return;
    }
    Object.values(object).map((value) => {
      this.objectTravel(value, keyField, initialArgs);
    });
  }
}
