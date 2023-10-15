"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const allowOrigins_1 = require("./allowOrigins");
exports.corsOptions = {
    origin: (origin, callback) => {
        if (allowOrigins_1.allowedOriginsSystem.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};
