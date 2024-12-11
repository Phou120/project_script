import { SendMailDto } from "../dto/user.dto";

export class RegisterSuccessEvent {
    constructor(
      public readonly data: SendMailDto,
    ) {}
  }
  