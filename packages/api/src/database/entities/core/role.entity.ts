import { BaseEntity, CoreEntity } from '@db/entities/base';
import { JsonColumn, StringColumn } from '@lib/typeorm/decorator.typeorm';
import { Index } from 'typeorm';

@CoreEntity()
export class Role extends BaseEntity {
  @Index()
  @StringColumn({ unique: true, nullable: false })
  name: string;

  @StringColumn({ nullable: true })
  description: string;

  @JsonColumn({ nullable: false })
  permissions: string[];
}
