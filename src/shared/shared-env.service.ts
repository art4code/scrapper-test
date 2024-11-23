import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { EnvEnum } from "./enums/envs.enum";

const log = new Logger("SharedEnvService");

@Injectable()
export class SharedEnvService {
  constructor(private readonly configService: ConfigService) {}

  get<Response>(key: string): Response {
    const value = this.configService.get<Response>(key);

    log.debug(`Environment variable: ${key} = ${value}`);

    if (!Object.values(EnvEnum).includes(key as EnvEnum)) {
      log.error(`Unknown environment variable: ${key}, please add it to the EnvEnum in envs.enum.ts`);
    }

    return value as Response;
  }

  getOrThrow<Response>(key: string): Response {
    const value = this.get<Response>(key);

    if (!value) {
      log.error(`Undefined environment variable: ${key}`);
      throw new Error(`Undefined environment variable: ${key}`);
    }

    return value;
  }

  isEnvSetOrThrow() {
    const missingEnvVars: string[] = [];

    Object.values(EnvEnum).forEach((envVar) => {
      if (!this.configService.get<string>(envVar)) {
        missingEnvVars.push(envVar);
      }
    });

    if (missingEnvVars.length) {
      log.error(`Undefined environment variables: ${missingEnvVars.join(", ")}`);
      throw new Error(`Undefined environment variables: ${missingEnvVars.join(", ")}`);
    }
  }
}
