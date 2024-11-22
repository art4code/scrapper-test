import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { SharedService } from "./shared.service";
import { SharedEnvService } from "./shared-env.service";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [SharedEnvService, SharedService],
  exports: [SharedEnvService, SharedService],
})
export class SharedModule {}
