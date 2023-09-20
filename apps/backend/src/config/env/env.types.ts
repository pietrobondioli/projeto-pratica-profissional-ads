import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class S3Config {
  @IsString()
  @IsNotEmpty()
  accessKeyId: string;

  @IsString()
  @IsNotEmpty()
  secretAccessKey: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  bucket: string;
}

export class SESConfig {
  @IsString()
  @IsNotEmpty()
  accessKeyId: string;

  @IsString()
  @IsNotEmpty()
  secretAccessKey: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  mailFrom: string;
}

export class AwsConfig {
  @Type(() => S3Config)
  @ValidateNested()
  s3: S3Config;

  @Type(() => SESConfig)
  @ValidateNested()
  ses: SESConfig;
}

export class JwtConfig {
  @IsString()
  @IsNotEmpty()
  secret: string;

  @IsObject()
  signOptions: {
    expiresIn: string;
  };
}

export class DatabaseConfig {
  @IsString()
  @IsNotEmpty()
  uri: string;
}

export class AppConfig {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  appUrl: string;

  @IsString()
  @IsNotEmpty()
  apiUrl: string;
}

export class RootConfig {
  @Type(() => DatabaseConfig)
  @ValidateNested()
  database: DatabaseConfig;

  @Type(() => JwtConfig)
  @ValidateNested()
  jwt: JwtConfig;

  @Type(() => AwsConfig)
  @ValidateNested()
  aws: AwsConfig;

  @Type(() => AppConfig)
  @ValidateNested()
  app: AppConfig;
}
