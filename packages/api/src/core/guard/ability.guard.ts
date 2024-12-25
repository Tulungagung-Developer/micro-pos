import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Actions, RbacService, Subjects } from '@core/services/rbac.service';
import { ABILITY_REFLECT_KEY } from '@core/decorator/ability.decorator';
import { FastifyRequest } from '@core/interceptor/request.interceptor';

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rbac: RbacService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const requiredAbility = this.reflector.getAllAndOverride<{ action: Actions; subject: Subjects }>(
      ABILITY_REFLECT_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );

    if (!requiredAbility) {
      return true;
    }

    const req = ctx.switchToHttp().getRequest<FastifyRequest>();
    req.ability = this.rbac.createForUser(await req.user.role);

    return req.ability.can(requiredAbility.action, requiredAbility.subject);
  }
}
