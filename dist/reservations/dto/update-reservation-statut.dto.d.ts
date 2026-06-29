import { StatutReservation } from '../../common/enums/statut-reservation.enum';
export declare class UpdateReservationStatutDto {
    statut?: StatutReservation;
    modePaiement?: string;
    numeroTransaction?: string;
    paiementValide?: boolean;
    whatsappEnvoye?: boolean;
}
