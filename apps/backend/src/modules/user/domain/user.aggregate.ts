import { v4 } from 'uuid';

import { AggregateBase } from '#/be/lib/ddd/aggregate.base';
import { PasswordHelper } from '#/be/lib/utils/password-helper';

import { UserCreatedEvent } from './events/user-created.event';
import { User } from './user.entity';

export class UserAggregate extends AggregateBase {
  static create(email: string, password: string): User {
    const id = v4();

    const user = new User();
    user.id = id;
    user.email = email;
    user.passwordHash = PasswordHelper.hashPassword(password);

    this.addDomainEvent(new UserCreatedEvent(user));

    return user;
  }
}
