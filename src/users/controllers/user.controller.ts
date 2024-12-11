import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.services';
import { SendMailDto } from '../dto/user.dto';

@Controller()
export class UserController {
  constructor(
    private readonly _userService: UserService
    ) {}

  @Post('send-email')
  async createUser(@Body() body: SendMailDto): Promise<any>
  {
    await this._userService.create(body);
    return { success: true, message: 'Send Email successfully!' };
  }
}
