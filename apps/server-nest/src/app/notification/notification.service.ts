import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import TelegramBot from "node-telegram-bot-api";
import { ErrorMessage } from "@libs/constants";
import type { TelegramConfig } from "@libs/nestjs-core";
import { PrismaService } from "@libs/nestjs-core";
import { escapeMarkdownV2, getStrategyChangedMessage } from "./message";
import type { WebhookDto } from "./webhook.dto";

@Injectable()
export class NotificationService {
  private bot: TelegramBot;
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const botToken = this.configService.get<TelegramConfig>("telegram")?.botToken;
    if (!botToken) {
      this.logger.error("Telegram configuration is incomplete");
      return;
    }
    this.bot = new TelegramBot(botToken);
  }

  async handleMessageReceived(msg: TelegramBot.Message): Promise<void> {
    const chatId = msg.chat.id.toString();
    const { text } = msg;
    if (text === "/start") {
      const telegramId = msg.from?.id;
      if (!telegramId) {
        throw new Error(ErrorMessage.MSG_TELEGRAM_ID_NOT_FOUND);
      }
      await this.prisma.subscriber.upsert({
        where: { telegramId },
        update: { chatId },
        create: { telegramId, chatId },
      });
    }
  }

  async processWebhook(webhookData: WebhookDto): Promise<void> {
    try {
      this.logger.log(`Webhook event received: ${webhookData.eventType}`);

      if (webhookData.eventType === "TRANSACTION") {
        await this.processStrategyChangedEvent();
      } else {
        this.logger.warn(`Unsupported event type: ${webhookData.eventType}`);
      }
    } catch (error) {
      this.logger.error(`Error processing webhook: ${error.message}`, error.stack);
    }
  }

  private async processStrategyChangedEvent(): Promise<void> {
    const subscribers = await this.prisma.subscriber.findMany();
    await Promise.all(
      subscribers.map(async (subscriber) => {
        const message = getStrategyChangedMessage();
        await this.sendNotification(subscriber.chatId, message);
      }),
    );
  }

  private async sendNotification(chatId: string, message: string): Promise<void> {
    if (!this.bot) {
      this.logger.error("Telegram bot not initialized");
      return;
    }
    const escapedMessage = escapeMarkdownV2(message);
    await this.bot.sendMessage(chatId, escapedMessage, { parse_mode: "MarkdownV2" });
  }
}
