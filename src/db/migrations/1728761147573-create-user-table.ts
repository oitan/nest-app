import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1728761147573 implements MigrationInterface {
  name = 'CreateUserTable1728761147573';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "is_seeded" boolean NOT NULL DEFAULT false, "create_date_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "last_changed_date_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "last_changed_by" character varying(300), "internal_comment" character varying(300), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "full_name" character varying(255) NOT NULL, "birthday" date NOT NULL, "mobile_phone" character varying(15) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_81640cabe754993749b74480468" UNIQUE ("mobile_phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
