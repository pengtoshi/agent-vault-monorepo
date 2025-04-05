import { ObjectType, OmitType } from "@nestjs/graphql";
import { AgentInfo } from "./agent.model";

@ObjectType()
export class PublicAgentInfo extends OmitType(AgentInfo, ["privateKey"]) {}
