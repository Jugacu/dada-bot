import { Message as MessageData } from 'discord.js';
import { injectable } from 'tsyringe';
import { Event } from '../Event';

import { CommandManager } from '../../CommandManager';
import { Dada } from '../../../Dada';

@injectable()
export default class Message extends Event {
    public constructor(
        private readonly commandManager: CommandManager,
        private readonly dada: Dada,
    ) {
        super();
    }

    public exec(messageData: [MessageData]): boolean {
        const [message] = messageData;

        const isBotMentioned = message.mentions.users.some((u) => u.id === this.dada.getClient().user?.id);

        if (
            message.content.startsWith(CommandManager.COMMAND_PREFIX)
            || isBotMentioned
        ) {
            this.commandManager.dispatch(message, isBotMentioned);
        }

        return true;
    }
}
