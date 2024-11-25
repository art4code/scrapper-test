import { Test, TestingModule } from "@nestjs/testing";

import { SheinController } from "./shein.controller";

describe("SheinController", () => {
  let controller: SheinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SheinController],
    }).compile();

    controller = module.get<SheinController>(SheinController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
