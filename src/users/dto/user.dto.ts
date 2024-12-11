import { IsNotEmpty, IsEmail, IsPhoneNumber, MinLength, MaxLength } from 'class-validator';

export class SendMailDto {
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Phone number is required' })
    @MinLength(6, { message: 'Name must be at least 6 characters long' })
    @MaxLength(15, { message: 'Name must be at least 15 characters long' })
    tel: string;

    @IsNotEmpty({ message: 'Message is required' })
    message: string;
}
