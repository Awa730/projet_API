import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Awa Diop' })
  @IsNotEmpty({ message: 'Le nom complet est obligatoire' })
  nom: string;

  @ApiProperty({ example: 'awa.diop@example.com' })
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @ApiProperty({ example: 'motdepasse123', minLength: 6 })
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caracteres' })
  password: string;

  @ApiPropertyOptional({ example: '+221771234567' })
  @IsOptional()
  telephone?: string;
}
