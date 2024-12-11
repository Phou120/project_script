import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { typeOrmOption } from './commands/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MailModule } from './users/mail/mail.module';


@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, // Loads `.env` globally
    }),
    TypeOrmModule.forRootAsync(typeOrmOption()),
    UserModule,
    MailModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
