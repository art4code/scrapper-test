import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { LoggingInterceptor } from "./logger/interceptor.logger";
import { SharedEnvService } from "./shared/shared-env.service";

const log = new Logger("main");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  const sharedEnvService = app.get(SharedEnvService);
  sharedEnvService.isEnvSetOrThrow();

  const APP_LISTEN_PORT = sharedEnvService.get<number>("APP_LISTEN_PORT");

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "auth-token"],
    credentials: true,
  });

  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(APP_LISTEN_PORT);

  log.verbose(`Server is running on ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  log.error(err);
});
