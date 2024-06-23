import { MigrationInterface, QueryRunner } from "typeorm";

export class DescriptionUser1719173411974 implements MigrationInterface {
    name = 'DescriptionUser1719173411974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "description" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_65e08bdc736432de44501924f3" ON "user" ("description") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_65e08bdc736432de44501924f3"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "description"`);
    }

}
