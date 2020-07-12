"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const Event_1 = require("../Event");
const EventManager_1 = require("../EventManager");
const logger_1 = __importDefault(require("../../helpers/logger"));
let Ready = class Ready extends Event_1.Event {
    constructor(eventManager) {
        super();
        this.eventManager = eventManager;
    }
    exec() {
        var _a, _b;
        logger_1.default.info(`Logged in as ${(_b = (_a = this.eventManager.client) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.tag}`);
        return true;
    }
};
Ready = __decorate([
    tsyringe_1.injectable(),
    __metadata("design:paramtypes", [EventManager_1.EventManager])
], Ready);
exports.default = Ready;
