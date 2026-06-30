import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'awa.diop@example.com' })
  @IsEmail({}, { message: 'Email invalide' })
  email: string;
}
