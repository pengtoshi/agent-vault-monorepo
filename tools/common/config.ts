import path from "path";

export const projectDir = path.resolve(__dirname, "../../");

export enum TargetService {
  "client-next" = "client-next",
  "server-nest" = "server-nest",
  "postgres-db" = "postgres-db",
}

export enum TargetStage {
  "prod" = "prod",
  "qa" = "qa",
  "local" = "local",
}
