import { Module } from "@nestjs/common";

import { SheinController } from "./shein.controller";
import { SheinService } from "./shein.service";

@Module({
  controllers: [SheinController],
  providers: [SheinService],
})
export class SheinModule {}
