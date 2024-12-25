import { BaseEntity, CoreEntity } from '@db/entities/base';
import { EntityManager, Index, ManyToOne, Not } from 'typeorm';
import { Exclude } from 'class-transformer';
import { hasPassed, time } from '@lib/utils/time.util';
import { DateColumn, ForeignColumn, StringColumn } from '@lib/typeorm/decorator.typeorm';
import { Connector } from '@lib/typeorm/connector.typeorm';
import { Role } from '@db/entities/core/role.entity';

export enum TypeUserOTP {
  FORGOT_PASSWORD = 'forgot_password',
}

@CoreEntity()
export class User extends BaseEntity {
  @Index()
  @StringColumn({ unique: true, nullable: false })
  email: string;

  @Index()
  @StringColumn({ unique: true, length: 16, nullable: false })
  name: string;

  @Exclude()
  @StringColumn({ nullable: false })
  password: string;

  @Exclude()
  @StringColumn({ nullable: true })
  otp_type: TypeUserOTP | null;

  @Exclude()
  @StringColumn({ length: 6, nullable: true })
  otp: string | null;

  @Exclude()
  @DateColumn({ nullable: true })
  otp_expires_at: Date | null;

  @Exclude()
  @ForeignColumn()
  role_id: string;

  @ManyToOne(() => Role, { onDelete: 'SET NULL' })
  role: Promise<Role>;

  clearOTP() {
    this.otp = null;
    this.otp_expires_at = null;
    this.otp_type = null;
  }

  async generateOTP(type: TypeUserOTP, manager?: EntityManager) {
    await Connector(async (em: EntityManager) => {
      if (this.otp && this.otp_type === type && hasPassed(this.otp_expires_at)) return;

      this.otp = Math.floor(100000 + Math.random() * 900000).toString();
      this.otp_expires_at = time().add(10, 'minutes').toDate();
      this.otp_type = type;

      const isExists = await em
        .getRepository(User)
        .exists({ where: { otp: this.otp, id: Not(this.id), otp_type: type } });
      if (isExists) return this.generateOTP(type, em);
    }, manager);
  }
}
