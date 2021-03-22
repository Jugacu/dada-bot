import fs from 'fs';
import path from 'path';

import { singleton } from 'tsyringe';

import { Message as MessageData } from 'discord.js';
import { Command } from './commands/Command';

import logger from '../utils/logger';
import { getNameFromFilename, resolveInstance } from '../utils/helpers';

@singleton()
export class CommandManager {
    public static readonly COMMANDS_DIR = 'commands/autoregister'
    public static readonly COMMAND_PREFIX = '+'

    public commands = new Map<string, Command>()

    public init(): void {
        this.loadCommands();
    }

    public loadCommands(): void {
        const dir = path.join(__dirname, CommandManager.COMMANDS_DIR);

        fs.readdirSync(dir).forEach(async (filename) => {
            const commandName = getNameFromFilename(filename);
            if (!commandName) {
                logger.error(`Cannot get command name of '${filename}'`);
                return;
            }

            try {
                const command = await resolveInstance<Command>(path.join(dir, filename));
                this.commands.set(commandName, command);

                logger.info(`Loaded command '${commandName}'`);
            } catch (e) {
                logger.error(`Failed to load command '${commandName}'`);
            }
        });
    }

    public reloadCommands(): void {
        this.commands.clear();
        this.loadCommands();
    }

    public dispatch(message: MessageData, isMention: boolean): void {
        const parts = message.content.split(' ');

        if (isMention) {
            parts.shift();
        } else {
            parts[0] = parts[0].substring(1, parts[0].length); // Removes the prefix
        }

        const command = this.commands.get(parts[0]);

        if (command === undefined) {
            return;
        }

        command.setMessage(message);

        if (!command.canExec()) {
            return;
        }

        command.exec(parts);
    }
}
