import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { StatutReservation } from '../../common/enums/statut-reservation.enum';

export class UpdateReservationStatutDto {
  @ApiPropertyOptional({ enum: StatutReservation, example: StatutReservation.CONFIRMEE })
  @IsOptional()
  @IsEnum(StatutReservation)
  statut?: StatutReservation;

  @ApiPropertyOptional({ example: 'Wave' })
  @IsOptional()
  @IsString()
  modePaiement?: string;

  @ApiPropertyOptional({ example: 'TXN123456789' })
  @IsOptional()
  @IsString()
  numeroTransaction?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  paiementValide?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  whatsappEnvoye?: boolean;
}
