import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserEntity1696106678409 implements MigrationInterface {
    name = 'AddedUserEntity1696106678409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar" character varying NOT NULL DEFAULT 'default.png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
    }

}
