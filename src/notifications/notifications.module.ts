import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { NotificationsService } from "./notifications.service.js";
import { NotificationsController } from "./notifications.controller.js";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "EMAILS_QUEUE",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://0.0.0.0:5672"],
          queue: "notifications",
        },
      },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
