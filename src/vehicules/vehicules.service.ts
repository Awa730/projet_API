/**
 * Service metier des vehicules.
 * Responsable du CRUD du catalogue vehicules (creation, lecture, modification, suppression).
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicule } from './entities/vehicule.entity';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';

@Injectable()
export class VehiculesService {
  constructor(
    @InjectRepository(Vehicule)
    private readonly vehiculesRepository: Repository<Vehicule>,
  ) {}

  create(dto: CreateVehiculeDto): Promise<Vehicule> {
    const vehicule = this.vehiculesRepository.create(dto);
    return this.vehiculesRepository.save(vehicule);
  }

  findAll(): Promise<Vehicule[]> {
    return this.vehiculesRepository.find();
  }

  async findOne(id: number): Promise<Vehicule> {
    const vehicule = await this.vehiculesRepository.findOne({ where: { id } });
    if (!vehicule) {
      throw new NotFoundException(`Vehicule #${id} introuvable`);
    }
    return vehicule;
  }

  async update(id: number, dto: UpdateVehiculeDto): Promise<Vehicule> {
    const vehicule = await this.findOne(id);
    Object.assign(vehicule, dto);
    return this.vehiculesRepository.save(vehicule);
  }

  async remove(id: number): Promise<void> {
    const vehicule = await this.findOne(id);
    await this.vehiculesRepository.remove(vehicule);
  }
}
