import { singleton } from 'tsyringe';

import Discord, { Client, Intents } from 'discord.js';
import { EventManager } from './discord/EventManager';
import { CommandManager } from './discord/CommandManager';

@singleton()
export class Dada {
    private readonly client: Client

    public constructor(
        private readonly eventManager: EventManager,
        private readonly commandManager: CommandManager,
    ) {
        const intents = new Intents(Intents.NON_PRIVILEGED);
        intents.add('GUILD_MEMBERS');

        this.client = new Discord.Client({
            ws: {
                intents,
            },
        });

        commandManager.init();
        eventManager.init(this.client);
    }

    public getClient() {
        return this.client;
    }
}
