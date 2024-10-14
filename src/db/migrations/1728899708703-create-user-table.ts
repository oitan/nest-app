import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1728899708703 implements MigrationInterface {
  name = 'CreateUserTable1728899708703';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "is_seeded" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_by" character varying(300), "internal_comment" character varying(300), "email" character varying(255) NOT NULL, "hashed_password" character varying(255) NOT NULL, "password_salt" character varying(255) NOT NULL, "full_name" character varying(255) NOT NULL, "birthday" date NOT NULL, "mobile_phone" character varying(15) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
