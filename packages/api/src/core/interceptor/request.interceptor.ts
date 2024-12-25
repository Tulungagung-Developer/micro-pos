import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest as FRequest } from 'fastify';
import { UserAbility } from '@core/services/rbac.service';
import { User } from '@db/entities/core/user.entity';

export type QueryFiler = { search?: string; sort?: string };
export type QueryPage = { page: number; page_size: number };
export type RequestContext = { filter?: QueryFiler; page?: QueryPage };
export type FastifyRequest = FRequest & { user: User; ability: UserAbility; requestContext: RequestContext };

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const _req = context.switchToHttp().getRequest<FastifyRequest>();

    return next.handle();
  }
}
