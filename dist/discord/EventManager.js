"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var EventManager_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
const tsyringe_1 = require("tsyringe");
const logger_1 = __importDefault(require("../helpers/logger"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let EventManager = EventManager_1 = class EventManager {
    init(client) {
        this.loadEvents(client);
        this.client = client;
    }
    loadEvents(client) {
        const dir = path.join(__dirname, EventManager_1.EVENTS_DIR);
        fs.readdirSync(dir).forEach(async (filename) => {
            const eventName = EventManager_1.getEventName(filename);
            if (!eventName) {
                logger_1.default.error(`Cannot get event name of '${filename}'`);
                return;
            }
            try {
                const event = await EventManager_1.getEventInstance(path.join(dir, filename));
                client.on(eventName, (...data) => {
                    const status = event.exec(data);
                    if (!status) {
                        logger_1.default.error(`Error executing event '${eventName}'`);
                    }
                });
                logger_1.default.info(`Loaded event '${eventName}'`);
            }
            catch (e) {
                logger_1.default.error(`Failed to load event '${eventName}'`);
            }
        });
    }
    static getEventName(filename) {
        const regexed = /(.+)\.(js|ts)/i.exec(filename);
        if (!regexed || !regexed[1]) {
            return null;
        }
        return regexed[1].toLocaleLowerCase();
    }
    static async getEventInstance(path) {
        const clazz = (await Promise.resolve().then(() => __importStar(require(path)))).default;
        return tsyringe_1.container.resolve(clazz);
    }
};
EventManager.EVENTS_DIR = 'events';
EventManager = EventManager_1 = __decorate([
    tsyringe_1.singleton()
], EventManager);
exports.EventManager = EventManager;
