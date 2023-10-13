import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserEntity1696106532284 implements MigrationInterface {
    name = 'AddedUserEntity1696106532284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar" character varying NOT NULL DEFAULT 'default.png'`);
    }

}
