import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { LoggingInterceptor } from "./logger/interceptor.logger";

const log = new Logger("main");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(3000);

  log.verbose(`Server is running on ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  log.error(err);
});
