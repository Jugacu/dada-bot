import { Command } from '../Command'
import { injectable } from 'tsyringe'

import logger from '../../utils/logger'

@injectable()
export default class Say extends Command {
	exec(args: string[]): boolean {
		this.message?.channel.send(args.join(' ')).catch()

		this.message?.delete().catch(() => {
			logger.warn(`Couldn't delete a message from '${ this.message?.author.username }' in channel '${ this.message?.channel.id }'`)
		})

		return true
	}

	canExec(): boolean {
		return !!this.message?.member?.hasPermission('ADMINISTRATOR')
			|| !!this.message?.member?.roles.cache.find(r => r.name === 'dada')
	}

	public get description(): string {
		return 'Makes the bot say anything'
	}
}