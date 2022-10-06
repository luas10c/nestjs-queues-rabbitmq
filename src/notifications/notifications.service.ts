import { Inject, Injectable } from "@nestjs/common";
import { ClientRMQ } from "@nestjs/microservices";

@Injectable()
export class NotificationsService {
  constructor(@Inject("EMAILS_QUEUE") private readonly queues: ClientRMQ) {}

  async create() {
    const data = this.queues.send("notifications", {
      email: "luas10c@gmail.com",
    });
    return data;
  }
}
