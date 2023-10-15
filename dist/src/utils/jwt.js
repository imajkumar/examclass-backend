"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const signJwt = (payload, keyName, options) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.get("accessTokenPublicKey"));
};
exports.signJwt = signJwt;
const verifyJwt = (token, keyName) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.get("accessTokenPublicKey"));
        return decoded;
    }
    catch (error) {
        // console.log(error);
        return null;
    }
};
exports.verifyJwt = verifyJwt;
