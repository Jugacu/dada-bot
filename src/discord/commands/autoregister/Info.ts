import { MessageEmbed } from 'discord.js';
import { injectable } from 'tsyringe';
import { Command } from '../Command';
import { CommandManager } from '../../CommandManager';

@injectable()
export default class Info extends Command {
    public constructor(
        private readonly commandManager: CommandManager,
    ) {
        super();
    }

    public async exec(): Promise<boolean> {
        const embed = new MessageEmbed()
            .setTitle('Info')
            .setColor(0xf266db)
            .setDescription('Bot info')
            .addField('Current loaded commands', `${this.commandManager.commands.size} on cache`)
            .addField('Current prefix', CommandManager.COMMAND_PREFIX)
            .addField('Github project', 'https://github.com/Jugacu/dada-bot');

        this.message?.channel.send(embed).catch();

        return true;
    }

    public canExec(): boolean {
        return true;
    }

    public get description(): string {
        return 'Shows some bot information';
    }
}
