import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UserService } from '../services/user.services';
import { JoiValidationPipe } from 'src/validates/joi-validation-pipe.validate';
import { SendMail } from '../dto/user.dto';
import { SendMailSchema } from '../schemas/send-mail.schema';

@Controller()
export class UserController {
  constructor(
    private readonly _userService: UserService
    ) {}

  @Post('send-email')
  @UsePipes(new JoiValidationPipe(SendMailSchema)) // Pass I18nService
  async createUser(@Body() body: SendMail): Promise<any>
  {
    await this._userService.create(body);
    return { success: true, message: 'Send Email successfully!' };
  }
}
