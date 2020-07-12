"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const tsyringe_1 = require("tsyringe");
const Dada_1 = require("./Dada");
dotenv_1.default.config(); // .env variables
const dada = tsyringe_1.container.resolve(Dada_1.Dada);
