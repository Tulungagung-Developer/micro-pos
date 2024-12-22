import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { DataSource, EntityNotFoundError, TypeORMError } from 'typeorm';
import { ExceptionCode, ExceptionErrorMessages } from '@core/constant/exception-code.constant';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseResponseDto } from '@core/dto/base.dto';
import { EnvConfig } from '@conf/env.config';
import { stackToJSON } from '@lib/utils/stack-json.util';

@Catch(TypeORMError)
export class TypeormFilter implements ExceptionFilter {
  private readonly logger = new Logger(TypeormFilter.name);

  catch(exception: TypeORMError, host: ArgumentsHost) {
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

    if (exception instanceof EntityNotFoundError) {
      const entityTargetName = ((exception.entityClass as any).dataSource as DataSource).entityMetadatas[0].targetName;

      response.error = {
        code: ExceptionCode.ENTITY_NOT_FOUND,
        message: `${entityTargetName} ${ExceptionErrorMessages[ExceptionCode.ENTITY_NOT_FOUND]}`,
        details: Object.entries(exception.criteria.where).map(([key, value]) => `${key}: ${value}`),
      };

      return res.send(response);
    }

    response.error = {
      code: ExceptionCode.DATABASE_ERROR,
      message: 'Something were wrong in API when accessing database',
      details: [],
    };

    return res.send(response);
  }
}
