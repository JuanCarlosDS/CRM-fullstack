import { MigrationInterface, QueryRunner } from "typeorm";

export class UserPhoneAndTimeZone1719173856514 implements MigrationInterface {
    name = 'UserPhoneAndTimeZone1719173856514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "timeZone" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_8e1f623798118e629b46a9e629" ON "user" ("phone") `);
        await queryRunner.query(`CREATE INDEX "IDX_91b0e1151390aff6f79a2d8df1" ON "user" ("timeZone") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_91b0e1151390aff6f79a2d8df1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e1f623798118e629b46a9e629"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "timeZone"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

}
