import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBookings21719876806817 implements MigrationInterface {
    name = 'CreateBookings21719876806817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "createdAt"`);
    }

}
