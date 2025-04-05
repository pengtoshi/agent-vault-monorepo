import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { MonitorController } from "./monitor.controller";

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [MonitorController],
})
export class MonitorModule {}
