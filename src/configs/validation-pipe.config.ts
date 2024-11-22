import { BadRequestException, Logger, ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";

const log = new Logger("Validation");

export const ValidationPipeConfig = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
    log.debug(validationErrors);

    const errorMessages = validationErrors.map((error) => error.constraints);

    return new BadRequestException(errorMessages);
  },
});
