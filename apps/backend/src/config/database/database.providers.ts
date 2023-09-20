import { DataSource } from 'typeorm';

import { rootConfig } from '../env/env.module';

export const TYPEORM_DATA_SOURCE = Symbol('TYPEORM_DATA_SOURCE');

export const databaseProviders = [
  {
    provide: TYPEORM_DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        url: rootConfig.database.uri,
        entities: [__dirname + '/../**/*.model{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
