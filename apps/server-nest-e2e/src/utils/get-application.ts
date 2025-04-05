import type { INestApplication, ModuleMetadata } from "@nestjs/common";
import { createServerNestTestingModule } from "./create-testing-module";

let server: INestApplication;
let serverScheduler: INestApplication;

export async function getServerApplication(metadata?: ModuleMetadata): Promise<INestApplication> {
  if (!server) {
    server = await createServerNestTestingModule(metadata);
  }
  server.enableShutdownHooks();
  return server;
}

export async function getServerSchedulerApplication(metadata?: ModuleMetadata): Promise<INestApplication> {
  if (!serverScheduler) {
    serverScheduler = await createServerNestTestingModule(metadata);
  }
  serverScheduler.enableShutdownHooks();
  return serverScheduler;
}
