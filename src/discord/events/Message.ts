import { Event } from '../Event'

import { Message as MessageData } from 'discord.js'

import { CommandManager } from '../CommandManager'
import { injectable } from 'tsyringe'

@injectable()
export default class Message extends Event {
	constructor(
		private readonly commandManager: CommandManager
	) {
		super()
	}

	exec(message: [MessageData]): boolean {
		if (message[0].content.startsWith(CommandManager.COMMAND_PREFIX)) {
			this.commandManager.dispatch(message[0])
		}

		return true
	}
}