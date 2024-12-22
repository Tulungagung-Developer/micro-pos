import { AbstractException } from '@core/exception/abstract.exception';
import { ValidationError } from 'class-validator';
import { ExceptionCode } from '@core/constant/exception-code.constant';

export class ValidationException extends AbstractException {
  constructor(private readonly errors: ValidationError[]) {
    super();
    this.code = ExceptionCode.VALIDATION_ERROR;
    this.message = 'Failed to validate request';
    this.details = errors.map((e) => (e.constraints ? Object.values(e.constraints) : [])).flat();
  }
}
