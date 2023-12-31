import {
  TypedConfigModule,
  dotenvLoader,
  selectConfig,
} from 'nest-typed-config';

import { RootConfig } from './env.types';

export const EnvModule = TypedConfigModule.forRoot({
  isGlobal: true,
  schema: RootConfig,
  load: dotenvLoader({
    separator: '__',
  }),
});

export const rootConfig = selectConfig(EnvModule, RootConfig);
