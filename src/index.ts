import 'reflect-metadata';
import dotenv from 'dotenv';

import { container } from 'tsyringe';

import { Dada } from './Dada';

dotenv.config(); // .env variables

const dada = container.resolve(Dada);
dada.getClient().login(process.env.TOKEN);
