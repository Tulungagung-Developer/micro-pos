import { ErrorPayloadDto } from '@core/dto/base.dto';
import { ExceptionCode } from '@core/constant/exception-code.constant';

export abstract class AbstractException extends Error {
  code: ExceptionCode;
  message: string;
  details?: string[] = [];

  protected constructor() {
    super();
    this.name = this.constructor.name;
  }

  getPayload(): Record<keyof ErrorPayloadDto, any> {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}
