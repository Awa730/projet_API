/**
 * DTO de mise a jour d'un vehicule.
 * Herite de CreateVehiculeDto avec tous les champs rendus optionnels (PartialType).
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateVehiculeDto } from './create-vehicule.dto';

export class UpdateVehiculeDto extends PartialType(CreateVehiculeDto) {}
