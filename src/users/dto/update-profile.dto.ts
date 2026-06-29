import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Awa Diop' })
  @IsOptional()
  @IsNotEmpty()
  nom?: string;

  @ApiPropertyOptional({ example: 'awa.diop@example.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Email invalide' })
  email?: string;

  @ApiPropertyOptional({ example: '+221771234567' })
  @IsOptional()
  telephone?: string;
}
