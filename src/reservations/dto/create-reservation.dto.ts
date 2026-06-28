/**
 * DTO de creation d'une reservation.
 * Les champs optionnels varient selon le type (location : dates, achat : adresse).
 */
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeReservation } from '../../common/enums/type-reservation.enum';

export class CreateReservationDto {
  @ApiProperty({ example: 1, description: 'Id du vehicule concerne' })
  @IsInt()
  vehiculeId: number;

  @ApiProperty({ enum: TypeReservation, example: TypeReservation.LOCATION })
  @IsEnum(TypeReservation)
  type: TypeReservation;

  @ApiProperty({ example: 'Awa Diop' })
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ example: '+221771234567' })
  @IsNotEmpty()
  telephone: string;

  @ApiProperty({ example: 'awa.diop@example.com' })
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @ApiPropertyOptional({
    example: '2026-07-01',
    description: 'Obligatoire si type = location',
  })
  @IsOptional()
  @IsString()
  dateDebut?: string;

  @ApiPropertyOptional({
    example: '2026-07-05',
    description: 'Obligatoire si type = location',
  })
  @IsOptional()
  @IsString()
  dateFin?: string;

  @ApiPropertyOptional({
    example: 'Sacré-Coeur 3, Dakar',
    description: 'Obligatoire si type = achat (adresse de livraison)',
  })
  @IsOptional()
  @IsString()
  adresse?: string;
}
