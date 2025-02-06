import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { User } from '../persistence/typeorm/entity/user.entity';
import { Rent } from '../persistence/typeorm/entity/rent.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
      logging: this.configService.get<boolean>('database.logging'),
      entities: [User, Rent],
      autoLoadEntities: this.configService.get<boolean>('orm.autoLoadEntities'),
      synchronize: this.configService.get<boolean>('orm.synchronize'),
    };
  }
}
