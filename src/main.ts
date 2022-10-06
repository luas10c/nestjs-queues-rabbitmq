import { NestFactory } from "@nestjs/core";
import { type MicroserviceOptions, Transport } from "@nestjs/microservices";

import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://0.0.0.0:5672"],
      queue: "notifications",
    },
  });

  const PORT = process.env.PORT || 44769;

  await app.startAllMicroservices();
  await app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌎 Listening on ${PORT}`);
    console.log(`🔥 Local Address: http://0.0.0.0:${PORT}`);
  });
}

bootstrap();
