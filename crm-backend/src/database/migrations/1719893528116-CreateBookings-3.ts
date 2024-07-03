import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBookings31719893528116 implements MigrationInterface {
    name = 'CreateBookings31719893528116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "assigneeId" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_9c2bff09462a691917b3f79515" ON "booking" ("description") `);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_eb2bf3552004085302b9c7b9485" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_eb2bf3552004085302b9c7b9485"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c2bff09462a691917b3f79515"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "assigneeId"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "title"`);
    }

}
