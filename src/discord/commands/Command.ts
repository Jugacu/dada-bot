import { Message } from 'discord.js';

export abstract class Command {
    protected message?: Message

    abstract exec(args: string[]): Promise<boolean>

    public canExec(): boolean {
        return false;
    }

    public setMessage(message: Message): void {
        this.message = message;
    }

    public get description(): string {
        return 'command.description';
    }
}
