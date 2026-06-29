import { StatutVehicule } from '../../common/enums/statut-vehicule.enum';
import { Reservation } from '../../reservations/entities/reservation.entity';
export declare class Vehicule {
    id: number;
    nom: string;
    categorie: string;
    places: number;
    carburant: string;
    boite: string;
    annee: number;
    moteur: string;
    vitesseMax: string;
    puissance: string;
    acceleration: string;
    usageIdeal: string;
    pointsForts: string[];
    statut: StatutVehicule;
    prixLocation: number;
    prixAchat: number;
    image: string;
    reservations: Reservation[];
    createdAt: Date;
    updatedAt: Date;
}
