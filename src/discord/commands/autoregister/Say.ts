import { injectable } from 'tsyringe';

import logger from '../../../utils/logger';
import { AdminCommand } from '../AdminCommand';

@injectable()
export default class Say extends AdminCommand {
    public async exec(args: string[]): Promise<boolean> {
        const [command, ...message] = args;

        this.message?.channel.send(message.join(' ')).catch();

        this.message?.delete().catch(() => {
            // eslint-disable-next-line max-len
            logger.warn(`Couldn't delete a message from '${this.message?.author.username}' in channel '${this.message?.channel.id}'`);
        });

        return true;
    }

    public get description(): string {
        return 'Makes the bot say anything';
    }
}
