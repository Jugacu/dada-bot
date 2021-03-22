import { injectable } from 'tsyringe';
import { Message } from 'discord.js';
import { AdminCommand } from '../AdminCommand';

import { productos as products } from '../../../utils/datasets/products_es.json';
import logger from '../../../utils/logger';
import { Dada } from '../../../Dada';

@injectable()
export default class BulkRename extends AdminCommand {
    public constructor(
        private readonly dada: Dada,
    ) {
        super();
    }

    public async exec(): Promise<boolean> {
        const { guild } = <Message> this.message;

        if (guild === null) {
            return false;
        }

        this.message?.channel.send({
            content: 'I\'m on it, this may take a while...',
        });

        try {
            const members = await guild.members.fetch();

            for (const [, member] of members) {
                if (member.user.id === this.dada.getClient().user?.id) {
                    continue;
                }

                const timeout = new Promise((res) => setTimeout(() => res(), 10000));
                const product = products[Math.floor(Math.random() * products.length)];

                logger.info(`Editing member ${member.user.username}`);

                try {
                    // eslint-disable-next-line no-await-in-loop
                    await Promise.race([
                        timeout,
                        member.setNickname(product.nombre.substring(0, 32)),
                    ]);
                } catch (e) {
                    logger.error(`Failed editing user ${member.user.username}:`, e);
                }
            }

            logger.info('Finished member edition');
        } catch (e) {
            return false;
        }

        this.message?.channel.send({
            content: 'Bulk renaming finished',
        });

        return true;
    }

    public get description(): string {
        return 'Renames all the users with a random product name';
    }
}
