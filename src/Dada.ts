import { singleton } from 'tsyringe'

import Discord, { Client } from 'discord.js'
import { EventManager } from './discord/EventManager'
import { CommandManager } from './discord/CommandManager'

@singleton()
export class Dada {
	private readonly client: Client

	constructor(
		private readonly eventManager: EventManager,
		private readonly commandManager: CommandManager
	) {
		this.client = new Discord.Client()

		commandManager.init()
		eventManager.init(this.client)
	}

	public getClient() {
		return this.client
	}
}