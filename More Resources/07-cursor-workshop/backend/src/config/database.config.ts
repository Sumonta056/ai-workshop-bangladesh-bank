import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST', 'localhost'),
      port: this.configService.get('DB_PORT', 5432),
      username: this.configService.get('DB_USERNAME', 'workshop'),
      password: this.configService.get('DB_PASSWORD', 'workshop123'),
      database: this.configService.get('DB_DATABASE', 'taskmanager_db'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false, // Use migrations instead
      logging: this.configService.get('NODE_ENV') === 'development',
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      migrationsRun: false,
    };
  }
}

// DataSource for TypeORM CLI
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'workshop',
  password: process.env.DB_PASSWORD || 'workshop123',
  database: process.env.DB_DATABASE || 'taskmanager_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
} as DataSourceOptions);
