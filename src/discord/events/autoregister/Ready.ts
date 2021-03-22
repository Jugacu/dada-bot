import { injectable } from 'tsyringe';

import { Event } from '../Event';

import logger from '../../../utils/logger';
import { Dada } from '../../../Dada';

@injectable()
export default class Ready extends Event {
    public constructor(
        private readonly dada: Dada,
    ) {
        super();
    }

    public exec(): boolean {
        logger.info(`Logged in as ${this.dada.getClient().user?.tag}`);
        return true;
    }
}
