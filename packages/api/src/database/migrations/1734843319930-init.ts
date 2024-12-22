import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1734843319930 implements MigrationInterface {
  name = 'Init1734843319930';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // language=SQL format=false
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "name" character varying(16) NOT NULL, "password" character varying NOT NULL, "otp_type" character varying, "otp" character varying(6), "otp_expires_at" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
    await queryRunner.query(`CREATE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON "user" ("name") `);
    await queryRunner.query(
      `INSERT INTO public."user" (id, created_at, updated_at, email, name, password, otp_type, otp, otp_expires_at) VALUES ('2e6965b7-a72a-4a11-87d3-9915622d5e88', '2024-12-22 05:03:53.118953', '2024-12-22 05:03:53.118953', 'default@email.com', 'administrator', '$2b$10$FFmL9vgS6i9g.B5Yug80seVG8eHCG/PD5OcEjDzULKda.7kiDlQru', null, null, null);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE from public."user" WHERE id = '2e6965b7-a72a-4a11-87d3-9915622d5e88';`);
    await queryRunner.query(`DROP INDEX "public"."IDX_065d4d8f3b5adb4a08841eae3c"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
