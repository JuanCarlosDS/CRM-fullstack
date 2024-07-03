import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrganizations1719976678515 implements MigrationInterface {
    name = 'CreateOrganizations1719976678515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" character varying(500) NOT NULL, "description" text, "website" character varying, "phoneNumber" character varying, "email" character varying, "address" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c21e615583a3ebbb0977452afb" ON "organization" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d06de67ef6ab02cbd938988bb" ON "organization" ("email") `);
        await queryRunner.query(`ALTER TABLE "booking" ADD "organizationId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "organizationId" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD "organizationId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "organizationId" integer`);
        await queryRunner.query(`ALTER TABLE "article" ADD "organizationId" integer`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "startTime" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "endTime" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_7de109c855905e2a655d796b68a" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_32a4bdd261ec81f4ca6b3abe262" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_5b0272d923a31c972bed1a1ac4d" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_550f3ca3203e6073b7076d3c5ac" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_550f3ca3203e6073b7076d3c5ac"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dfda472c0af7812401e592b6a61"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_5b0272d923a31c972bed1a1ac4d"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_32a4bdd261ec81f4ca6b3abe262"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_7de109c855905e2a655d796b68a"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "endTime" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "startTime" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "organizationId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "organizationId"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "organizationId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "organizationId"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "organizationId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d06de67ef6ab02cbd938988bb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c21e615583a3ebbb0977452afb"`);
        await queryRunner.query(`DROP TABLE "organization"`);
    }

}
