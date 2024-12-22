import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseResponseDto, PaginationResultDto } from '@core/dto/base.dto';
import { BaseEntity } from '@db/entities/base';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<FastifyRequest>();
    const res = ctx.getResponse<FastifyReply>();

    res.status(HttpStatus.OK);
    res.headers({ 'x-request-id': req.id });

    return next.handle().pipe(
      map((data) => {
        const toPlain = (v) => (v instanceof BaseEntity ? v.toJSON() : instanceToPlain(v));

        if (data instanceof PaginationResultDto) {
          const response = new BaseResponseDto<Array<Record<string, any>>>();

          response.success = true;
          response.request_id = req.id;

          response.data = data.items.map((r) => toPlain(r));
          response.meta = toPlain(data.meta);

          return response;
        }

        const response = new BaseResponseDto<Record<string, any>>();

        response.success = true;
        response.request_id = req.id;

        response.data = toPlain(data);

        return response;
      }),
    );
  }
}
