/**
 * DTO de connexion.
 * Contient l'email et le mot de passe de l'utilisateur.
 */
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@movia.sn' })
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @ApiProperty({ example: 'Admin123!' })
  @IsNotEmpty({ message: 'Le mot de passe est obligatoire' })
  password: string;
}
