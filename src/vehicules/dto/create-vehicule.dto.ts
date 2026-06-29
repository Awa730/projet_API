import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatutVehicule } from '../../common/enums/statut-vehicule.enum';

export class CreateVehiculeDto {
  @ApiProperty({ example: 'BMW X3' })
  @IsNotEmpty({ message: 'Le nom du vehicule est obligatoire' })
  nom: string;

  @ApiProperty({ example: 'SUV' })
  @IsNotEmpty()
  categorie: string;

  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(1)
  places: number;

  @ApiProperty({ example: 'Diesel' })
  @IsNotEmpty()
  carburant: string;

  @ApiProperty({ example: 'Automatique' })
  @IsNotEmpty()
  boite: string;

  @ApiProperty({ example: 2022 })
  @IsInt()
  @Min(1900)
  annee: number;

  @ApiProperty({ example: '2.0L TwinPower' })
  @IsNotEmpty()
  moteur: string;

  @ApiProperty({ example: '230 km/h' })
  @IsNotEmpty()
  vitesseMax: string;

  @ApiProperty({ example: '190 ch' })
  @IsNotEmpty()
  puissance: string;

  @ApiProperty({ example: '8,0 s' })
  @IsNotEmpty()
  acceleration: string;

  @ApiProperty({ example: 'Voyage, famille et rendez-vous pro' })
  @IsNotEmpty()
  usageIdeal: string;

  @ApiProperty({ example: ['Confort premium', 'Tenue de route', 'Grand coffre'] })
  @IsArray()
  @IsString({ each: true })
  pointsForts: string[];

  @ApiPropertyOptional({ enum: StatutVehicule, example: StatutVehicule.AVAILABLE })
  @IsOptional()
  @IsEnum(StatutVehicule)
  statut?: StatutVehicule;

  @ApiProperty({ example: 65000, description: 'Prix de location par jour (FCFA)' })
  @IsInt()
  @Min(0)
  prixLocation: number;

  @ApiProperty({ example: 22000000, description: 'Prix d\'achat (FCFA)' })
  @IsInt()
  @Min(0)
  prixAchat: number;

  @ApiProperty({ example: '/images/BMW X3.jpeg' })
  @IsNotEmpty()
  image: string;
}
