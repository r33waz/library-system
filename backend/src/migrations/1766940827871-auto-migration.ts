import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1766940827871 implements MigrationInterface {
    name = 'AutoMigration1766940827871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_EMAIL"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BORROW_REQUEST_LIBRARY"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BORROW_REQUEST_BOOK"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BORROW_REQUEST_USER"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BOOK_LIBRARY"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BOOK_SLUG"`);
        await queryRunner.query(`ALTER TABLE "borrow_request" DROP COLUMN "hello"`);
        await queryRunner.query(`ALTER TABLE "borrow_request" ADD "bill_id" uuid`);
        await queryRunner.query(`ALTER TABLE "borrow_request" ADD CONSTRAINT "UQ_13d3ec0991aa45a896d56f377b1" UNIQUE ("bill_id")`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "UQ_f7d8db89361716a255bec8700c7" UNIQUE ("firebaseId")`);
        await queryRunner.query(`ALTER TABLE "borrow_request" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "borrow_request" ADD "startDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "borrow_request" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "borrow_request" ADD "endDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "summary"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "summary" text NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_USER_ID" ON "auth" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_ADMIN_ID" ON "auth" ("adminId") `);
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_LIBRARY_ID" ON "auth" ("libraryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_LIBRARY_EMP_ID" ON "auth" ("libraryEmpId") `);
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_BLOCKED" ON "auth" ("blocked") `);
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_DELETED_AT" ON "auth" ("deleted_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_BR_BILL_ID" ON "borrow_request" ("bill_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_BR_DELETED_AT" ON "borrow_request" ("deleted_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_BR_END_DATE" ON "borrow_request" ("endDate") `);
        await queryRunner.query(`CREATE INDEX "IDX_BR_STATUS" ON "borrow_request" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_BR_LIBRARY_ID" ON "borrow_request" ("library_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_BR_BOOK_ID" ON "borrow_request" ("book_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_BR_USER_ID" ON "borrow_request" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_BOOK_DELETED_AT" ON "book" ("deleted_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_BOOK_AVAILABLE_COPIES" ON "book" ("availableCopies") `);
        await queryRunner.query(`CREATE INDEX "IDX_BOOK_PRICE" ON "book" ("price") `);
        await queryRunner.query(`CREATE INDEX "IDX_BOOK_AUTHOR" ON "book" ("author") `);
        await queryRunner.query(`CREATE INDEX "IDX_BOOK_LIBRARY_ID" ON "book" ("libraryId") `);
        await queryRunner.query(`ALTER TABLE "borrow_request" ADD CONSTRAINT "FK_13d3ec0991aa45a896d56f377b1" FOREIGN KEY ("bill_id") REFERENCES "bill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow_request" DROP CONSTRAINT "FK_13d3ec0991aa45a896d56f377b1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BOOK_LIBRARY_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BOOK_AUTHOR"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BOOK_PRICE"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BOOK_AVAILABLE_COPIES"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BOOK_DELETED_AT"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BR_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BR_BOOK_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BR_LIBRARY_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BR_STATUS"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BR_END_DATE"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BR_DELETED_AT"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BR_BILL_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_DELETED_AT"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_BLOCKED"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_LIBRARY_EMP_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_LIBRARY_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_ADMIN_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_USER_ID"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "summary"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "summary" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "borrow_request" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "borrow_request" ADD "endDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "borrow_request" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "borrow_request" ADD "startDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "UQ_f7d8db89361716a255bec8700c7"`);
        await queryRunner.query(`ALTER TABLE "borrow_request" DROP CONSTRAINT "UQ_13d3ec0991aa45a896d56f377b1"`);
        await queryRunner.query(`ALTER TABLE "borrow_request" DROP COLUMN "bill_id"`);
        await queryRunner.query(`ALTER TABLE "borrow_request" ADD "hello" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_BOOK_SLUG" ON "book" ("slug") `);
        await queryRunner.query(`CREATE INDEX "IDX_BOOK_LIBRARY" ON "book" ("libraryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_BORROW_REQUEST_USER" ON "borrow_request" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_BORROW_REQUEST_BOOK" ON "borrow_request" ("book_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_BORROW_REQUEST_LIBRARY" ON "borrow_request" ("library_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_EMAIL" ON "auth" ("email") `);
    }

}
