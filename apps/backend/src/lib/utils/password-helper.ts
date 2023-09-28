import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  static hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
  }

  static comparePassword(password: string, passwordHash: string) {
    return bcrypt.compareSync(password, passwordHash);
  }
}
