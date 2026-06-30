import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'a1b2c3d4e5f6...', description: 'Jeton recu par email' })
  @IsNotEmpty({ message: 'Le jeton de reinitialisation est obligatoire' })
  token: string;

  @ApiProperty({ example: 'nouveauMotDePasse123', minLength: 6 })
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caracteres' })
  nouveauMotDePasse: string;
}
