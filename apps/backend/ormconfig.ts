import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
console.log(__dirname);

export const dataSource = new DataSource({
  type: 'mysql',
  url: process.env.database__uri,
  entities: [`${__dirname}/src/**/**.model{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
});
