import { TypeReservation } from '../../common/enums/type-reservation.enum';
export declare class CreateReservationDto {
    vehiculeId: number;
    type: TypeReservation;
    nom: string;
    telephone: string;
    email: string;
    dateDebut?: string;
    dateFin?: string;
    adresse?: string;
}
