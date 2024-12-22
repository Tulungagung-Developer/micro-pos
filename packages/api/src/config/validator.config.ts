import { ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from '@core/exception/validation.exception';

export const ValidatorConfig: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
  exceptionFactory: (errors: ValidationError[]) => new ValidationException(errors),
};
