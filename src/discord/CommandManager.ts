import { singleton } from 'tsyringe'

import { Command } from './Command'

import fs from 'fs'
import path from 'path'

import logger from '../utils/logger'
import { getNameFromFilename, resolveInstance } from '../utils/helpers'

import { Message as MessageData } from 'discord.js'

@singleton()
export class CommandManager {
	public static readonly COMMANDS_DIR = 'commands'
	public static readonly COMMAND_PREFIX = '+'

	public commands = new Map<string, Command>()

	public init(): void {
		this.loadCommands()
	}

	public loadCommands(): void {
		const dir = path.join(__dirname, CommandManager.COMMANDS_DIR)
		fs.readdirSync(dir).forEach(async (filename) => {
			const commandName = getNameFromFilename(filename)
			if (!commandName) {
				logger.error(`Cannot get command name of '${ filename }'`)
				return
			}

			try {
				const command = await resolveInstance<Command>(path.join(dir, filename))
				this.commands.set(commandName, command)

				logger.info(`Loaded command '${ commandName }'`)
			} catch (e) {
				logger.error(`Failed to load command '${ commandName }'`)
			}
		})
	}

	dispatch(message: MessageData): void {
		const parts = message.content.split(' ')
		parts[0] = parts[0].substring(1, parts[0].length)

		const command = this.commands.get(parts[0])
		if (command) {
			command.setMessage(message)
			if (command.canExec()) {
				command.exec(parts)
			}
		}
	}
}