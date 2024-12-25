import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, HttpException, Logger } from '@nestjs/common';
import { FastifyRequest } from '@core/interceptor/request.interceptor';
import { FastifyReply } from 'fastify';
import { BaseResponseDto } from '@core/dto/base.dto';
import { ExceptionCode, ExceptionErrorMessages } from '@core/constant/exception-code.constant';
import { EnvConfig } from '@conf/env.config';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<FastifyRequest>();
    const res = ctx.getResponse<FastifyReply>();

    if (EnvConfig.const.IS_DEVELOPMENT && EnvConfig.const.DEBUG) {
      this.logger.error(JSON.stringify({ request_id: req.id, details: exception.stack }));
    }

    const response = new BaseResponseDto<null>();
    response.success = false;
    response.request_id = req.id;
    response.data = null;

    if (exception instanceof ForbiddenException) {
      response.error = {
        code: ExceptionCode.FORBIDDEN,
        message: ExceptionErrorMessages.FORBIDDEN,
        details: [req.routerPath],
      };
    } else {
      response.error = {
        code: ExceptionCode.INTERNAL_SERVER_ERROR,
        message: exception.message,
        details: [],
      };
    }

    return res.send(response);
  }
}
