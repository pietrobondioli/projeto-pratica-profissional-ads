import { Aggregate } from '#/be/lib/ddd/aggregate.base';

import { User } from './user.entity';

export class UserAggregate extends Aggregate<User> {}
