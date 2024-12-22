import {
  BaseEntity as Base,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  Entity,
  EntityOptions,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { uuid } from '@lib/uid/uuid.library';

interface CoreEntityOptions extends EntityOptions {
  autoIncrement?: number;
}

export function CoreEntity(
  nameOrOptions?: string | CoreEntityOptions,
  maybeOptions?: CoreEntityOptions,
): ClassDecorator {
  const options = (typeof nameOrOptions === 'object' ? (nameOrOptions as CoreEntityOptions) : maybeOptions) || {};
  const name = typeof nameOrOptions === 'string' ? nameOrOptions : options.name;
  const engine = `InnoDB${options.autoIncrement ? ` AUTO_INCREMENT=${options.autoIncrement}` : ''}`;

  return Entity(name, { engine, ...options });
}

export class BaseEntity extends Base {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  updateDatabase() {
    if (!this.id) this.id = uuid();
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }

  toJSON(): Record<string, any> {
    return instanceToPlain(this, { excludePrefixes: ['__'] });
  }
}
