import { Module } from '@nestjs/common';
import { userController } from './controllers';
import { userService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RegisterSuccessListener } from './listeners/send-email.listener';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Import the User entity here
  controllers: [...userController],
  providers: [...userService, RegisterSuccessListener],
})
export class UserModule {}
