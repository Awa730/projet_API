import { User } from '../../users/entities/user.entity';
export declare class Notification {
    id: number;
    utilisateur: User;
    lu: boolean;
    message: string;
    details: {
        client?: string;
        vehicule?: string;
        montant?: string;
        modePaiement?: string;
        numeroTransaction?: string;
        reservationId?: string;
    };
    createdAt: Date;
}
