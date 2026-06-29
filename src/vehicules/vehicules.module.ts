import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculesService } from './vehicules.service';
import { VehiculesController } from './vehicules.controller';
import { Vehicule } from './entities/vehicule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicule])],
  controllers: [VehiculesController],
  providers: [VehiculesService],
  exports: [VehiculesService],
})
export class VehiculesModule {}
