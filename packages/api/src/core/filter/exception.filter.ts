import { ArgumentsHost, Catch, ExceptionFilter as Filter, HttpStatus, Logger } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AbstractException } from '@core/exception/abstract.exception';
import { BaseResponseDto } from '@core/dto/base.dto';
import { EnvConfig } from '@conf/env.config';
import { stackToJSON } from '@lib/utils/stack-json.util';
import { ExceptionCode, ExceptionErrorMessages } from '@core/constant/exception-code.constant';

@Catch()
export class ExceptionFilter implements Filter {
  private readonly logger = new Logger(ExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<FastifyRequest>();
    const res = ctx.getResponse<FastifyReply>();

    if (EnvConfig.const.IS_DEVELOPMENT && EnvConfig.const.DEBUG) {
      this.logger.error(JSON.stringify({ request_id: req.id, details: stackToJSON(exception.stack) }));
    }

    res.headers({ 'x-request-id': req.id });
    res.status(HttpStatus.OK);

    const response = new BaseResponseDto<null>();
    response.success = false;
    response.request_id = req.id;
    response.data = null;

    if (exception instanceof AbstractException) {
      response.error = exception.getPayload();
      return res.send(response);
    }

    response.error = {
      code: ExceptionCode.UNKNOW_ERROR,
      message: ExceptionErrorMessages.UNKNOW_ERROR,
      details: [],
    };

    return res.send(response);
  }
}
