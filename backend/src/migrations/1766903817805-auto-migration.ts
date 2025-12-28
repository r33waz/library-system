import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1766903817805 implements MigrationInterface {
    name = 'AutoMigration1766903817805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow_request" ADD "hello" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow_request" DROP COLUMN "hello"`);
    }

}
