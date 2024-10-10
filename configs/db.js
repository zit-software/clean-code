import path from 'path';
import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(process.cwd(), './cache/database.sqlite'),
});
