import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RegisterSuccessEvent } from '../events/send-email.event';
import { MAIL_SERVICE } from '../mail/inject-key';
import { IMail } from '../mail/mail.interface';

@EventsHandler(RegisterSuccessEvent)
export class RegisterSuccessListener
  implements IEventHandler<RegisterSuccessEvent>
{
  private readonly SEND_TO_EMAIL: string;
  private readonly MESSAGE: string;
  constructor(
    @Inject(MAIL_SERVICE) private readonly _mailer: IMail<any>,
    private readonly configService: ConfigService,
  ) {
    this.SEND_TO_EMAIL = this.configService.get<string>('SEND_TO_EMAIL');
    this.MESSAGE = this.configService.get<string>('MESSAGE');
  }

  async handle({data}: RegisterSuccessEvent): Promise<any> {
    const body = data;


    await this._mailer.sendMail({
      to: this.SEND_TO_EMAIL,
      subject: this.MESSAGE,
      template: 'send email',
      context: {
        subject: body, // Pass the subject to the context
      },
    });
  }
}
