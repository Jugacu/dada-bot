import { injectable } from 'tsyringe';

import { AdminCommand } from '../AdminCommand';
import { CommandManager } from '../../CommandManager';

@injectable()
export default class ReloadCommands extends AdminCommand {
    public constructor(
        private readonly commandManager: CommandManager,
    ) {
        super();
    }

    public async exec(args: string[]): Promise<boolean> {
        this.commandManager.reloadCommands();

        this.message?.channel.send({
            content: 'Commands reloaded!',
        });

        return true;
    }

    public get description(): string {
        return 'Reloads the available commands in cache, useful in development';
    }
}
