import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1695922610168 implements MigrationInterface {
  name = 'InitialMigration1695922610168';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`media\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL DEFAULT 'system', \`updatedBy\` varchar(255) NOT NULL DEFAULT 'system', \`key\` varchar(255) NOT NULL, \`bucket\` varchar(255) NOT NULL, \`mimeType\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`feedback\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL DEFAULT 'system', \`updatedBy\` varchar(255) NOT NULL DEFAULT 'system', \`rating\` int NOT NULL, \`comment\` varchar(255) NOT NULL, \`fromUserId\` varchar(36) NULL, \`reservationId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`payment\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL DEFAULT 'system', \`updatedBy\` varchar(255) NOT NULL DEFAULT 'system', \`paymentMethod\` enum ('CreditCard', 'Pix') NOT NULL, \`amount\` int NOT NULL, \`paymentDate\` datetime NOT NULL, \`reservationId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`reservation\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL DEFAULT 'system', \`updatedBy\` varchar(255) NOT NULL DEFAULT 'system', \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`totalPrice\` int NOT NULL, \`paymentStatus\` enum ('Pending', 'Paid', 'Failed') NOT NULL, \`equipmentId\` varchar(36) NULL, \`renterId\` varchar(36) NULL, \`paymentId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`equipment\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL DEFAULT 'system', \`updatedBy\` varchar(255) NOT NULL DEFAULT 'system', \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`pricePerDay\` int NOT NULL, \`availabilityStatus\` tinyint NOT NULL, \`photoId\` varchar(36) NULL, \`ownerId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`notification\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL DEFAULT 'system', \`updatedBy\` varchar(255) NOT NULL DEFAULT 'system', \`message\` varchar(255) NOT NULL, \`status\` enum ('Read', 'Unread') NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`change_email_token\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL DEFAULT 'system', \`updatedBy\` varchar(255) NOT NULL DEFAULT 'system', \`newEmail\` varchar(255) NOT NULL, \`token\` varchar(255) NOT NULL, \`expiresAt\` datetime NOT NULL, \`consumedAt\` datetime NULL, \`invalidatedAt\` datetime NULL, \`consumerIp\` varchar(255) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`change_password_token\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL DEFAULT 'system', \`updatedBy\` varchar(255) NOT NULL DEFAULT 'system', \`token\` varchar(255) NOT NULL, \`expiresAt\` datetime NOT NULL, \`consumedAt\` datetime NULL, \`invalidatedAt\` datetime NULL, \`consumerIp\` varchar(255) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`email_verification_token\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL DEFAULT 'system', \`updatedBy\` varchar(255) NOT NULL DEFAULT 'system', \`token\` varchar(255) NOT NULL, \`expiresAt\` datetime NOT NULL, \`consumedAt\` datetime NULL, \`invalidatedAt\` datetime NULL, \`consumerIp\` varchar(255) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_profile\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL DEFAULT 'system', \`updatedBy\` varchar(255) NOT NULL DEFAULT 'system', \`firstName\` varchar(255) NOT NULL DEFAULT '', \`lastName\` varchar(255) NOT NULL DEFAULT '', \`contact\` varchar(255) NOT NULL DEFAULT '', \`address\` varchar(255) NOT NULL DEFAULT '', \`description\` varchar(255) NOT NULL DEFAULT '', \`profilePictureId\` varchar(36) NULL, UNIQUE INDEX \`REL_3aee0dc6611fea9c9d62775798\` (\`profilePictureId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL DEFAULT 'system', \`updatedBy\` varchar(255) NOT NULL DEFAULT 'system', \`email\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`confirmedEmail\` tinyint NOT NULL, \`userProfileId\` varchar(36) NULL, UNIQUE INDEX \`REL_2ffc8d3455097079866bfca4d4\` (\`userProfileId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`chat\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL DEFAULT 'system', \`updatedBy\` varchar(255) NOT NULL DEFAULT 'system', \`user1Id\` varchar(36) NULL, \`user2Id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`chat_message\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL DEFAULT 'system', \`updatedBy\` varchar(255) NOT NULL DEFAULT 'system', \`content\` varchar(255) NOT NULL, \`chatId\` varchar(36) NULL, \`senderId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`feedback\` ADD CONSTRAINT \`FK_bfea5673b7379b1adfa2036da3f\` FOREIGN KEY (\`fromUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`feedback\` ADD CONSTRAINT \`FK_c90005b831464eaa38f16501eb5\` FOREIGN KEY (\`reservationId\`) REFERENCES \`reservation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_6bb61cbede7c869adde5587f345\` FOREIGN KEY (\`reservationId\`) REFERENCES \`reservation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_942f621373099d0cfc9168383f8\` FOREIGN KEY (\`equipmentId\`) REFERENCES \`equipment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_9d71b19c031d3b0328bf5341518\` FOREIGN KEY (\`renterId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_66f3317f7c28a8507ad8580540f\` FOREIGN KEY (\`paymentId\`) REFERENCES \`payment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`equipment\` ADD CONSTRAINT \`FK_a2ba3607810ce3c55a836bef72d\` FOREIGN KEY (\`photoId\`) REFERENCES \`media\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`equipment\` ADD CONSTRAINT \`FK_8c675a8a1fb7097c17e3280d1df\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`change_email_token\` ADD CONSTRAINT \`FK_0e18d70dd4f32f0369676cc2431\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`change_password_token\` ADD CONSTRAINT \`FK_2211d7e28cef44a85c8430f1149\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`email_verification_token\` ADD CONSTRAINT \`FK_77b04d285509a2e6f5f44598be4\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD CONSTRAINT \`FK_3aee0dc6611fea9c9d627757982\` FOREIGN KEY (\`profilePictureId\`) REFERENCES \`media\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_2ffc8d3455097079866bfca4d47\` FOREIGN KEY (\`userProfileId\`) REFERENCES \`user_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat\` ADD CONSTRAINT \`FK_e263d1c2fdcbc5a97216a28e226\` FOREIGN KEY (\`user1Id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat\` ADD CONSTRAINT \`FK_99f86fa5d1a0f13f9cbbeae3120\` FOREIGN KEY (\`user2Id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat_message\` ADD CONSTRAINT \`FK_6d2db5b1118d92e561f5ebc1af0\` FOREIGN KEY (\`chatId\`) REFERENCES \`chat\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat_message\` ADD CONSTRAINT \`FK_a2be22c99b34156574f4e02d0a0\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`chat_message\` DROP FOREIGN KEY \`FK_a2be22c99b34156574f4e02d0a0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat_message\` DROP FOREIGN KEY \`FK_6d2db5b1118d92e561f5ebc1af0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat\` DROP FOREIGN KEY \`FK_99f86fa5d1a0f13f9cbbeae3120\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat\` DROP FOREIGN KEY \`FK_e263d1c2fdcbc5a97216a28e226\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_2ffc8d3455097079866bfca4d47\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP FOREIGN KEY \`FK_3aee0dc6611fea9c9d627757982\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`email_verification_token\` DROP FOREIGN KEY \`FK_77b04d285509a2e6f5f44598be4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`change_password_token\` DROP FOREIGN KEY \`FK_2211d7e28cef44a85c8430f1149\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`change_email_token\` DROP FOREIGN KEY \`FK_0e18d70dd4f32f0369676cc2431\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1ced25315eb974b73391fb1c81b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`equipment\` DROP FOREIGN KEY \`FK_8c675a8a1fb7097c17e3280d1df\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`equipment\` DROP FOREIGN KEY \`FK_a2ba3607810ce3c55a836bef72d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_66f3317f7c28a8507ad8580540f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_9d71b19c031d3b0328bf5341518\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_942f621373099d0cfc9168383f8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_6bb61cbede7c869adde5587f345\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`feedback\` DROP FOREIGN KEY \`FK_c90005b831464eaa38f16501eb5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`feedback\` DROP FOREIGN KEY \`FK_bfea5673b7379b1adfa2036da3f\``,
    );
    await queryRunner.query(`DROP TABLE \`chat_message\``);
    await queryRunner.query(`DROP TABLE \`chat\``);
    await queryRunner.query(
      `DROP INDEX \`REL_2ffc8d3455097079866bfca4d4\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`REL_3aee0dc6611fea9c9d62775798\` ON \`user_profile\``,
    );
    await queryRunner.query(`DROP TABLE \`user_profile\``);
    await queryRunner.query(`DROP TABLE \`email_verification_token\``);
    await queryRunner.query(`DROP TABLE \`change_password_token\``);
    await queryRunner.query(`DROP TABLE \`change_email_token\``);
    await queryRunner.query(`DROP TABLE \`notification\``);
    await queryRunner.query(`DROP TABLE \`equipment\``);
    await queryRunner.query(`DROP TABLE \`reservation\``);
    await queryRunner.query(`DROP TABLE \`payment\``);
    await queryRunner.query(`DROP TABLE \`feedback\``);
    await queryRunner.query(`DROP TABLE \`media\``);
  }
}
