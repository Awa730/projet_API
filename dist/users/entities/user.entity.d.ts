import { Role } from '../../common/enums/role.enum';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Notification } from '../../notifications/entities/notification.entity';
export declare class User {
    id: number;
    nom: string;
    email: string;
    password: string;
    telephone: string;
    role: Role;
    reservations: Reservation[];
    notifications: Notification[];
    createdAt: Date;
    updatedAt: Date;
}
