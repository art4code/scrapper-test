import { Controller, Get, Logger, Query } from "@nestjs/common";

import { SheinService } from "./shein.service";

const log = new Logger("SheinController");

@Controller("shein")
export class SheinController {
  constructor(private readonly sheinService: SheinService) {}

  @Get("products")
  getProducts(@Query("product") product: string) {
    log.debug("Get all products");

    return this.sheinService.getProducts(product);
  }
}
