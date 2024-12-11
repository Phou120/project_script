import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';

export const typeOrmOption = (): TypeOrmModuleAsyncOptions => ({
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get<string>('DATABASE_HOST'),
    port: +config.get<number>('DATABASE_PORT'),
    username: config.get<string>('DATABASE_USERNAME'),
    password: config.get<string>('DATABASE_PASSWORD'),
    database: config.get<string>('DATABASE_NAME'),
    entities: [User], // Include your entities here
    synchronize: config.get<string>('DATABASE_SYNCHRONIZE') === 'true',
  }),
  inject: [ConfigService],
});
