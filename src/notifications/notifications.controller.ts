import { Controller, Post } from "@nestjs/common";
import {
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from "@nestjs/microservices";

import { NotificationsService } from "./notifications.service.js";

@Controller({
  path: "notifications",
})
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post("/")
  async create() {
    const data = await this.notificationsService.create();
    return data;
  }

  @MessagePattern("notifications")
  async getNotifications(
    @Payload() data: number[],
    @Ctx() context: RmqContext
  ) {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });

    return context.getArgByIndex(0);
  }
}
