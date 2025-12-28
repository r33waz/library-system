import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1766904226735 implements MigrationInterface {
    name = 'AutoMigration1766904226735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_1518391a178a27840edf478c7b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b54f616411ef3824f6a5c06ea4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2a4ffca483b42d743b708a14f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1a145eba3386ce298d1125625d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9ca856585267cb549ce274b4c3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_da052b08a5b50d4601bb0f15ac"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_60c46d3dac95598328e5830e2d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d30aded5099e1cfe849cc0152"`);
        await queryRunner.query(`CREATE INDEX "IDX_USER_UNIVERSITY_ID" ON "user" ("university_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_EMAIL" ON "auth" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_BORROW_REQUEST_LIBRARY" ON "borrow_request" ("library_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_BORROW_REQUEST_BOOK" ON "borrow_request" ("book_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_BORROW_REQUEST_USER" ON "borrow_request" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_BOOK_LIBRARY" ON "book" ("libraryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_BOOK_SLUG" ON "book" ("slug") `);
        await queryRunner.query(`CREATE INDEX "IDX_WISHLIST_USER_BOOK" ON "wishlist" ("userId", "bookId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_WISHLIST_USER_BOOK"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BOOK_SLUG"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BOOK_LIBRARY"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BORROW_REQUEST_USER"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BORROW_REQUEST_BOOK"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_BORROW_REQUEST_LIBRARY"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_EMAIL"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_UNIVERSITY_ID"`);
        await queryRunner.query(`CREATE INDEX "IDX_7d30aded5099e1cfe849cc0152" ON "wishlist" ("userId", "bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_60c46d3dac95598328e5830e2d" ON "book" ("slug") `);
        await queryRunner.query(`CREATE INDEX "IDX_da052b08a5b50d4601bb0f15ac" ON "book" ("libraryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9ca856585267cb549ce274b4c3" ON "borrow_request" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1a145eba3386ce298d1125625d" ON "borrow_request" ("book_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c2a4ffca483b42d743b708a14f" ON "borrow_request" ("library_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b54f616411ef3824f6a5c06ea4" ON "auth" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_1518391a178a27840edf478c7b" ON "user" ("university_id") `);
    }

}
