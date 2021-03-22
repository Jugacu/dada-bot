import { Command } from './Command';

export abstract class AdminCommand extends Command {
    public canExec(): boolean {
        return !!this.message?.member?.hasPermission('ADMINISTRATOR')
            || !!this.message?.member?.roles.cache.find((r) => r.name === 'dada');
    }
}
