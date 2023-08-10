import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1691669567456 implements MigrationInterface {
    name = 'CreateInitialTables1691669567456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "bonusPerYear" numeric(10,2) NOT NULL DEFAULT '0', "bonusPerSubordinate" numeric(10,2) NOT NULL DEFAULT '0', "bonusPerYearCap" integer NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "worker" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "salary" integer NOT NULL, "joinedAt" date NOT NULL, "roleId" integer, "hiredById" integer, CONSTRAINT "PK_dc8175fa0e34ce7a39e4ec73b94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "worker" ADD CONSTRAINT "FK_42a8f310868fa02c4aa9bbd586a" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worker" ADD CONSTRAINT "FK_725ed5d490f822bc678732d2579" FOREIGN KEY ("hiredById") REFERENCES "worker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worker" DROP CONSTRAINT "FK_725ed5d490f822bc678732d2579"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP CONSTRAINT "FK_42a8f310868fa02c4aa9bbd586a"`);
        await queryRunner.query(`DROP TABLE "worker"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
