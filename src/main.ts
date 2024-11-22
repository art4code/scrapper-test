import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

const log = new Logger("main");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  await app.listen(3000);
}

bootstrap().catch((err) => {
  log.error(err);
});
