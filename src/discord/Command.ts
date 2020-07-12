import { Message } from 'discord.js'

export abstract class Command {
	protected message?: Message

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	abstract exec(args: string[]): boolean

	public canExec(): boolean {
		return false
	}

	public setMessage(message: Message): void {
		this.message = message
	}

	public get description(): string {
		return 'command.description'
	}
}