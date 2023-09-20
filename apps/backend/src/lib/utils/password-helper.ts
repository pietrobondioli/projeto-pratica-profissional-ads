import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  static hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
  }

  static async comparePassword(password: string, passwordHash: string) {
    return bcrypt.compare(password, passwordHash);
  }
}
