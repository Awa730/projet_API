import { Repository } from 'typeorm';
import { Vehicule } from './entities/vehicule.entity';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
export declare class VehiculesService {
    private readonly vehiculesRepository;
    constructor(vehiculesRepository: Repository<Vehicule>);
    create(dto: CreateVehiculeDto): Promise<Vehicule>;
    findAll(): Promise<Vehicule[]>;
    findOne(id: number): Promise<Vehicule>;
    update(id: number, dto: UpdateVehiculeDto): Promise<Vehicule>;
    remove(id: number): Promise<void>;
}
