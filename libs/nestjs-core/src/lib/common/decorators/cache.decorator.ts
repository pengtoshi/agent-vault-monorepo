import { SetMetadata } from "@nestjs/common";

// LINK: https://toss.tech/article/nestjs-custom-decorator

export const CACHEABLE = Symbol("CACHEABLE");

export interface CacheOptions {
  prefix?: string;
  key?: string;
  keyArgs?: string[];
  ttl?: number;
  logger?: () => void;
}

export const Cacheable = (options: CacheOptions = {}): MethodDecorator => SetMetadata(CACHEABLE, options);
