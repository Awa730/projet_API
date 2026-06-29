import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationStatutDto } from './dto/update-reservation-statut.dto';
import { Role } from '../common/enums/role.enum';
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    create(user: {
        id: number;
    }, dto: CreateReservationDto): Promise<import("./entities/reservation.entity").Reservation>;
    findAll(): Promise<import("./entities/reservation.entity").Reservation[]>;
    findMine(user: {
        id: number;
    }): Promise<import("./entities/reservation.entity").Reservation[]>;
    findOne(id: number, user: {
        id: number;
        role: Role;
    }): Promise<import("./entities/reservation.entity").Reservation>;
    updateStatut(id: number, dto: UpdateReservationStatutDto): Promise<import("./entities/reservation.entity").Reservation>;
    remove(id: number): Promise<void>;
}
