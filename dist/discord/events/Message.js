"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
class Message extends Event_1.Event {
    exec(data) {
        return true;
    }
}
exports.default = Message;
