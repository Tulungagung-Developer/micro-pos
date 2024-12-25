import { Injectable } from '@nestjs/common';
import { User } from '@db/entities/core/user.entity';
import { AbilityBuilder, AbilityClass, InferSubjects, PureAbility } from '@casl/ability';
import { Role } from '@db/entities/core/role.entity';
import { Str } from '@lib/utils/general.util';

export enum Actions {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export const EntityMap = {
  User,
  Role,
} as const;
type EntityType = typeof EntityMap;

export type Subjects = InferSubjects<EntityType[keyof EntityType]> | 'all';
export type UserAbility = PureAbility<[Actions, Subjects]>;

@Injectable()
export class RbacService {
  createForUser(role: Role) {
    const { can, build } = new AbilityBuilder<UserAbility>(PureAbility as AbilityClass<UserAbility>);

    if (role.permissions.includes('all')) {
      can(Actions.Manage, 'all');
      return build();
    }

    for (const permission of role.permissions) {
      const [action, subject] = permission.split('@');
      const entity = EntityMap[Str(subject).toPascalCase()];
      if (entity) can(action as Actions, entity);
    }

    return build();
  }
}
