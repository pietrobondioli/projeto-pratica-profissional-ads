import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1693874112253 implements MigrationInterface {
  name = 'InitialMigration1693874112253';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`media_model\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, \`bucket\` varchar(255) NOT NULL, \`mimeType\` varchar(255) NOT NULL, \`lastUpdated\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_profile_model\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`contact\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`profilePictureId\` varchar(36) NULL, UNIQUE INDEX \`REL_7c933f47b92e360514fecc8409\` (\`profilePictureId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`feedback_model\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`rating\` int NOT NULL, \`comment\` varchar(255) NOT NULL, \`fromUserId\` varchar(36) NULL, \`toUserId\` varchar(36) NULL, \`reservationId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`payment_model\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`paymentMethod\` enum ('CreditCard', 'Pix') NOT NULL, \`amount\` int NOT NULL, \`paymentDate\` datetime NOT NULL, \`reservationId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`reservation_model\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`totalPrice\` int NOT NULL, \`paymentStatus\` enum ('Pending', 'Paid', 'Failed') NOT NULL, \`equipmentId\` varchar(36) NULL, \`renterId\` varchar(36) NULL, \`paymentId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`equipment_model\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`photo\` varchar(255) NOT NULL, \`pricePerDay\` int NOT NULL, \`availabilityStatus\` tinyint NOT NULL, \`ownerId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`notification_model\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, \`status\` enum ('Read', 'Unread') NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`change_password_token_model\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`token\` varchar(255) NOT NULL, \`expiresAt\` datetime NOT NULL, \`consumedAt\` datetime NULL, \`invalidatedAt\` datetime NULL, \`consumerIp\` varchar(255) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`email_verification_token_model\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`token\` varchar(255) NOT NULL, \`expiresAt\` datetime NOT NULL, \`consumedAt\` datetime NULL, \`invalidatedAt\` datetime NULL, \`consumerIp\` varchar(255) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_model\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`userProfileId\` varchar(36) NULL, UNIQUE INDEX \`REL_3cb1b12e5bd9ff914d67aeafaf\` (\`userProfileId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`change_email_token_model\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`newEmail\` varchar(255) NOT NULL, \`token\` varchar(255) NOT NULL, \`expiresAt\` datetime NOT NULL, \`consumedAt\` datetime NULL, \`invalidatedAt\` datetime NULL, \`consumerIp\` varchar(255) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`chat_message_model\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`timestamp\` datetime NOT NULL, \`chatId\` varchar(36) NULL, \`senderId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`chat_model\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`lastUpdated\` datetime NOT NULL, \`user1Id\` varchar(36) NULL, \`user2Id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile_model\` ADD CONSTRAINT \`FK_7c933f47b92e360514fecc8409e\` FOREIGN KEY (\`profilePictureId\`) REFERENCES \`media_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`feedback_model\` ADD CONSTRAINT \`FK_384a7ea7d9267204be03ccf42ca\` FOREIGN KEY (\`fromUserId\`) REFERENCES \`user_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`feedback_model\` ADD CONSTRAINT \`FK_0b6c40b84e9a535540ecd4f16a3\` FOREIGN KEY (\`toUserId\`) REFERENCES \`user_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`feedback_model\` ADD CONSTRAINT \`FK_1cf7f0d456c8f773b9cb05332f0\` FOREIGN KEY (\`reservationId\`) REFERENCES \`reservation_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_model\` ADD CONSTRAINT \`FK_a40dd9b0962f29accce846ff362\` FOREIGN KEY (\`reservationId\`) REFERENCES \`reservation_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation_model\` ADD CONSTRAINT \`FK_9f04b212ffd0644a63abd2a8ec6\` FOREIGN KEY (\`equipmentId\`) REFERENCES \`equipment_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation_model\` ADD CONSTRAINT \`FK_3efe9a82c7d12cbf417513a4b7f\` FOREIGN KEY (\`renterId\`) REFERENCES \`user_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation_model\` ADD CONSTRAINT \`FK_444e02e43476aa8ce9b19b12eb8\` FOREIGN KEY (\`paymentId\`) REFERENCES \`payment_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`equipment_model\` ADD CONSTRAINT \`FK_cb02c6a1f7265d7162ba80780c6\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_model\` ADD CONSTRAINT \`FK_5d8c79bd35bc0874383d7177d59\` FOREIGN KEY (\`userId\`) REFERENCES \`user_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`change_password_token_model\` ADD CONSTRAINT \`FK_4f998399847624ee039d3197dca\` FOREIGN KEY (\`userId\`) REFERENCES \`user_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`email_verification_token_model\` ADD CONSTRAINT \`FK_685edc7a7cd0bfdf9549f6e8856\` FOREIGN KEY (\`userId\`) REFERENCES \`user_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_model\` ADD CONSTRAINT \`FK_3cb1b12e5bd9ff914d67aeafaf8\` FOREIGN KEY (\`userProfileId\`) REFERENCES \`user_profile_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`change_email_token_model\` ADD CONSTRAINT \`FK_0c13e2e38c24284e79ac6c579d2\` FOREIGN KEY (\`userId\`) REFERENCES \`user_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat_message_model\` ADD CONSTRAINT \`FK_011becf1e8e93fae9ef130c034f\` FOREIGN KEY (\`chatId\`) REFERENCES \`chat_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat_message_model\` ADD CONSTRAINT \`FK_eaf85440fcfbe1ce422b0ec029a\` FOREIGN KEY (\`senderId\`) REFERENCES \`user_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat_model\` ADD CONSTRAINT \`FK_d09d826dffc19178d62daa93d81\` FOREIGN KEY (\`user1Id\`) REFERENCES \`user_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat_model\` ADD CONSTRAINT \`FK_b5a0ae198a1181fe23762bbbbda\` FOREIGN KEY (\`user2Id\`) REFERENCES \`user_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`chat_model\` DROP FOREIGN KEY \`FK_b5a0ae198a1181fe23762bbbbda\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat_model\` DROP FOREIGN KEY \`FK_d09d826dffc19178d62daa93d81\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat_message_model\` DROP FOREIGN KEY \`FK_eaf85440fcfbe1ce422b0ec029a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`chat_message_model\` DROP FOREIGN KEY \`FK_011becf1e8e93fae9ef130c034f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`change_email_token_model\` DROP FOREIGN KEY \`FK_0c13e2e38c24284e79ac6c579d2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_model\` DROP FOREIGN KEY \`FK_3cb1b12e5bd9ff914d67aeafaf8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`email_verification_token_model\` DROP FOREIGN KEY \`FK_685edc7a7cd0bfdf9549f6e8856\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`change_password_token_model\` DROP FOREIGN KEY \`FK_4f998399847624ee039d3197dca\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_model\` DROP FOREIGN KEY \`FK_5d8c79bd35bc0874383d7177d59\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`equipment_model\` DROP FOREIGN KEY \`FK_cb02c6a1f7265d7162ba80780c6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation_model\` DROP FOREIGN KEY \`FK_444e02e43476aa8ce9b19b12eb8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation_model\` DROP FOREIGN KEY \`FK_3efe9a82c7d12cbf417513a4b7f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation_model\` DROP FOREIGN KEY \`FK_9f04b212ffd0644a63abd2a8ec6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_model\` DROP FOREIGN KEY \`FK_a40dd9b0962f29accce846ff362\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`feedback_model\` DROP FOREIGN KEY \`FK_1cf7f0d456c8f773b9cb05332f0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`feedback_model\` DROP FOREIGN KEY \`FK_0b6c40b84e9a535540ecd4f16a3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`feedback_model\` DROP FOREIGN KEY \`FK_384a7ea7d9267204be03ccf42ca\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile_model\` DROP FOREIGN KEY \`FK_7c933f47b92e360514fecc8409e\``,
    );
    await queryRunner.query(`DROP TABLE \`chat_model\``);
    await queryRunner.query(`DROP TABLE \`chat_message_model\``);
    await queryRunner.query(`DROP TABLE \`change_email_token_model\``);
    await queryRunner.query(
      `DROP INDEX \`REL_3cb1b12e5bd9ff914d67aeafaf\` ON \`user_model\``,
    );
    await queryRunner.query(`DROP TABLE \`user_model\``);
    await queryRunner.query(`DROP TABLE \`email_verification_token_model\``);
    await queryRunner.query(`DROP TABLE \`change_password_token_model\``);
    await queryRunner.query(`DROP TABLE \`notification_model\``);
    await queryRunner.query(`DROP TABLE \`equipment_model\``);
    await queryRunner.query(`DROP TABLE \`reservation_model\``);
    await queryRunner.query(`DROP TABLE \`payment_model\``);
    await queryRunner.query(`DROP TABLE \`feedback_model\``);
    await queryRunner.query(
      `DROP INDEX \`REL_7c933f47b92e360514fecc8409\` ON \`user_profile_model\``,
    );
    await queryRunner.query(`DROP TABLE \`user_profile_model\``);
    await queryRunner.query(`DROP TABLE \`media_model\``);
  }
}
