"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddedUserEntity1696106403924 = void 0;
class AddedUserEntity1696106403924 {
    constructor() {
        this.name = 'AddedUserEntity1696106403924';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "passwordConfirm" character varying NOT NULL DEFAULT 'default.png', "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "photo" character varying NOT NULL DEFAULT 'default.png', "avatar" character varying NOT NULL DEFAULT 'default.png', "verified" boolean NOT NULL DEFAULT false, "verificationCode" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE INDEX "email_index" ON "users" ("email") `);
            yield queryRunner.query(`CREATE INDEX "verificationCode_index" ON "users" ("verificationCode") `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."verificationCode_index"`);
            yield queryRunner.query(`DROP INDEX "public"."email_index"`);
            yield queryRunner.query(`DROP TABLE "users"`);
        });
    }
}
exports.AddedUserEntity1696106403924 = AddedUserEntity1696106403924;
