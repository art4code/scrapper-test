import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "./shared/shared.module";
import { SheinModule } from "./shein/shein.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    SheinModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
