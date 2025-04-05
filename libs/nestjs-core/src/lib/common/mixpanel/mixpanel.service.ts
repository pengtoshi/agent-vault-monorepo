/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as mixpanel from "mixpanel";
import type { MixpanelConfig } from "../config/config.interface";

@Injectable()
export class MixpanelService {
  private readonly mixpanel: mixpanel.Mixpanel;

  constructor(private readonly configService: ConfigService) {
    const mixpanelConfig = this.configService.get<MixpanelConfig>("mixpanel")!;
    if (!mixpanelConfig || mixpanelConfig.disable || !mixpanelConfig.token) {
      return;
    }
    this.mixpanel = mixpanel.init(mixpanelConfig.token);
  }

  peopleSet(id: string, action: any = {}): void {
    const { address, createdAt, updatedAt, ...payload } = action;
    this.mixpanel.people.set(id, {
      address,
      $name: `${address.slice(0, 6)}...${address.slice(-4)}`,
      $created: createdAt,
      $updated: updatedAt,
      ...payload,
    });
  }

  track(id: string, action: any = {}): void {
    const { address, ...payload } = action;
    this.mixpanel.track(id, {
      distinct_id: address,
      ...payload,
    });
  }
}
