import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1766382638095 implements MigrationInterface {
    name = 'AutoMigration1766382638095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ADD "father_name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "father_name"`);
    }

}
