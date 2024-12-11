import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Scope } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';



@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, { abortEarly: false });  // Prevent Joi from stopping at the first error
    if (error) {
      const formattedErrors = error.details.map(detail => ({
        key: detail.context?.key || 'unknown_field',  // The field that failed validation
        message: detail.message.toString().replace(/"/g, ''), // The specific validation error message
      }));

      console.log(formattedErrors);

      throw new BadRequestException({
        status: 400,
        error: formattedErrors,  // Custom error format
      });
    }
    return value;
  }
}
