import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1769331940072 implements MigrationInterface {
    name = 'AutoMigration1769331940072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."auth_otps_otp_type_enum" AS ENUM('EMAIL_VERIFICATION', 'PASSWORD_RESET', 'SIGN_UP')`);
        await queryRunner.query(`ALTER TABLE "auth_otps" ADD "otp_type" "public"."auth_otps_otp_type_enum" DEFAULT 'SIGN_UP'`);
        await queryRunner.query(`UPDATE "auth_otps" SET "otp_type" = 'SIGN_UP' WHERE "otp_type" IS NULL`);
        await queryRunner.query(`ALTER TABLE "auth_otps" ALTER COLUMN "otp_type" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_otps" DROP COLUMN "otp_type"`);
        await queryRunner.query(`DROP TYPE "public"."auth_otps_otp_type_enum"`);
    }

}
