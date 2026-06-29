import { TypeReservation } from '../../common/enums/type-reservation.enum';
import { StatutReservation } from '../../common/enums/statut-reservation.enum';
import { User } from '../../users/entities/user.entity';
import { Vehicule } from '../../vehicules/entities/vehicule.entity';
export declare class Reservation {
    id: number;
    utilisateur: User;
    vehicule: Vehicule;
    type: TypeReservation;
    nom: string;
    telephone: string;
    email: string;
    dateDebut: string;
    dateFin: string;
    adresse: string;
    prix: number;
    statut: StatutReservation;
    modePaiement: string;
    whatsappEnvoye: boolean;
    dateValidation: Date;
    numeroTransaction: string;
    paiementValide: boolean;
    createdAt: Date;
    updatedAt: Date;
}
