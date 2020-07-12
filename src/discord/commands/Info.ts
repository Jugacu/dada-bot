import { Command } from '../Command'
import { MessageEmbed } from 'discord.js'
import { CommandManager } from '../CommandManager'
import { injectable } from 'tsyringe'

@injectable()
export default class Info extends Command {
	constructor(
		private readonly commandManager: CommandManager
	) {
		super()
	}

	exec(): boolean {
		const embed = new MessageEmbed()
			.setTitle('Info')
			.setColor(0xf266db)
			.setDescription(`Bot info`)
			.addField('Current loaded commands', `${this.commandManager.commands.size} on cache`)
			.addField('Current prefix', CommandManager.COMMAND_PREFIX)
			.addField('Github project', 'soon')

		this.message?.channel.send(embed).catch()

		return true
	}

	canExec(): boolean {
		return true
	}

	public get description(): string {
		return 'Shows some bot information'
	}
}