"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const alignColorsAndTime = winston_1.default.format.combine(winston_1.default.format.colorize({
    all: true
}), winston_1.default.format.label({
    label: '[LOGGER]'
}), winston_1.default.format.timestamp({
    format: "YY-MM-DD HH:MM:SS"
}), winston_1.default.format.printf(info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`));
const logger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), alignColorsAndTime)
        })
    ]
});
exports.default = logger;
