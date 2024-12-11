import { SendMailSchema } from '../schemas/send-mail.schema';
import { Joi } from '@hapi/joi';

// Export SendMail Type derived from the Joi schema
export type SendMail = Joi.InferType<typeof SendMailSchema>;
