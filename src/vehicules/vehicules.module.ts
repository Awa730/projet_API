/**
 * Module vehicules.
 * Gere le catalogue des vehicules et depend du module Countries pour les infos de pays.
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculesService } from './vehicules.service';
import { VehiculesController } from './vehicules.controller';
import { Vehicule } from './entities/vehicule.entity';
import { CountriesModule } from '../countries/countries.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicule]), CountriesModule],
  controllers: [VehiculesController],
  providers: [VehiculesService],
  exports: [VehiculesService],
})
export class VehiculesModule {}
