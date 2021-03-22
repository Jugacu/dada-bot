import { singleton } from 'tsyringe';

import { Client, ClientEvents } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { Event } from './events/Event';
import logger from '../utils/logger';

import { getNameFromFilename, resolveInstance } from '../utils/helpers';

@singleton()
export class EventManager {
    public static readonly EVENTS_DIR = 'events/autoregister'

    public init(client: Client): void {
        this.loadEvents(client);
    }

    private loadEvents(client: Client): void {
        const dir = path.join(__dirname, EventManager.EVENTS_DIR);
        fs.readdirSync(dir).forEach(async (filename) => {
            const eventName = getNameFromFilename(filename) as keyof ClientEvents;
            if (!eventName) {
                logger.error(`Cannot get event name of '${filename}'`);
                return;
            }

            try {
                const event = await resolveInstance<Event>(path.join(dir, filename));
                client.on(eventName, (...data) => {
                    const status = event.exec(data);
                    if (!status) {
                        logger.error(`Error executing event '${eventName}'`);
                    }
                });
                logger.info(`Loaded event '${eventName}'`);
            } catch (e) {
                logger.error(`Failed to load event '${eventName}'`);
            }
        });
    }
}
