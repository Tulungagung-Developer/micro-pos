import { SetMetadata } from '@nestjs/common';
import { Actions } from '@core/services/rbac.service';

export const ABILITY_REFLECT_KEY = 'permission';
export const HasAbility = (action: Actions, subject: any) => SetMetadata(ABILITY_REFLECT_KEY, { action, subject });
