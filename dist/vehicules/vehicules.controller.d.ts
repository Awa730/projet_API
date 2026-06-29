import { VehiculesService } from './vehicules.service';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
export declare class VehiculesController {
    private readonly vehiculesService;
    constructor(vehiculesService: VehiculesService);
    findAll(): Promise<import("./entities/vehicule.entity").Vehicule[]>;
    findOne(id: number): Promise<import("./entities/vehicule.entity").Vehicule>;
    create(dto: CreateVehiculeDto): Promise<import("./entities/vehicule.entity").Vehicule>;
    update(id: number, dto: UpdateVehiculeDto): Promise<import("./entities/vehicule.entity").Vehicule>;
    remove(id: number): Promise<void>;
}
