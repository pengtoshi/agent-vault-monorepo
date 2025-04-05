import { Body, Controller, Post } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { WebhookDto } from "./webhook.dto";

@Controller("notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post("webhook")
  async handleWebhook(@Body() webhookData: WebhookDto) {
    await this.notificationService.processWebhook(webhookData);
    return { success: true };
  }
}
