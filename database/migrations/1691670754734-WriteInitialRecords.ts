import { MigrationInterface, QueryRunner } from "typeorm"

export class Migrations1691600754734 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`INSERT INTO role ("name", "bonusPerYear", "bonusPerYearCap") VALUES ('Employee', '3.0', 30)`)
        queryRunner.query(`INSERT INTO role ("name", "bonusPerYear", "bonusPerSubordinate", "bonusPerYearCap") VALUES ('Manager', '5.0', '0.5', 40)`)
        queryRunner.query(`INSERT INTO role ("name", "bonusPerYear", "bonusPerSubordinate", "bonusPerYearCap") VALUES ('Sales', '1.0', '0.3', 35)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM role WHERE name='Employee' AND name='Manager' AND name='Sales'`)
    }

}
