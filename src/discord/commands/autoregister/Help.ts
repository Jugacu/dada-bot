import { injectable } from 'tsyringe';
import { MessageEmbed } from 'discord.js';

import { CommandManager } from '../../CommandManager';
import { Command } from '../Command';

@injectable()
export default class Help extends Command {
    public constructor(
        private readonly commandManager: CommandManager,
    ) {
        super();
    }

    public async exec(): Promise<boolean> {
        if (!this.message) return false;

        const embed = new MessageEmbed()
            .setTitle('Help')
            .setColor(0xf266db)
            .setDescription('Current commands available to **you**');

        for (const [key, command] of this.commandManager.commands) {
            command.setMessage(this.message);
            if (command.canExec()) {
                embed.addField(`${CommandManager.COMMAND_PREFIX}${key}`, command.description);
            }
        }

        this.message?.channel.send(embed).catch();

        return true;
    }

    public canExec(): boolean {
        return true;
    }

    public get description(): string {
        return 'Shows the the help';
    }
}
