import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationStatutDto } from './dto/update-reservation-statut.dto';
import { VehiculesService } from '../vehicules/vehicules.service';
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';
import { Role } from '../common/enums/role.enum';
export declare class ReservationsService {
    private readonly reservationsRepository;
    private readonly vehiculesService;
    private readonly usersService;
    private readonly notificationsService;
    constructor(reservationsRepository: Repository<Reservation>, vehiculesService: VehiculesService, usersService: UsersService, notificationsService: NotificationsService);
    create(userId: number, dto: CreateReservationDto): Promise<Reservation>;
    private notifierAdmins;
    findAll(): Promise<Reservation[]>;
    findAllForUser(userId: number): Promise<Reservation[]>;
    findOne(id: number): Promise<Reservation>;
    findOneForRequester(id: number, requester: {
        id: number;
        role: Role;
    }): Promise<Reservation>;
    updateStatut(id: number, dto: UpdateReservationStatutDto): Promise<Reservation>;
    remove(id: number): Promise<void>;
}
