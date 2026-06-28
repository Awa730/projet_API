import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { StatutVehicule } from '../../common/enums/statut-vehicule.enum';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity('vehicules')
export class Vehicule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nom: string;

  @Column({ length: 50 })
  categorie: string;

  @Column()
  places: number;

  @Column({ length: 30 })
  carburant: string;

  @Column({ length: 30 })
  boite: string;

  @Column()
  annee: number;

  @Column({ length: 100 })
  moteur: string;

  @Column({ name: 'vitesse_max', length: 30 })
  vitesseMax: string;

  @Column({ length: 30 })
  puissance: string;

  @Column({ length: 30 })
  acceleration: string;

  @Column({ name: 'usage_ideal', type: 'text' })
  usageIdeal: string;

  // Stocke en JSON pour respecter le tableau de chaines pointsForts du frontend
  @Column({ name: 'points_forts', type: 'json' })
  pointsForts: string[];

  @Column({
    type: 'enum',
    enum: StatutVehicule,
    default: StatutVehicule.AVAILABLE,
  })
  statut: StatutVehicule;

  @Column({ name: 'prix_location', type: 'int' })
  prixLocation: number;

  @Column({ name: 'prix_achat', type: 'int' })
  prixAchat: number;

  @Column()
  image: string;

  // Code pays ISO (ex: DE, JP, KR, FR) utilise pour appeler l'API REST Countries
  // et afficher le pays d'origine de la marque du vehicule
  @Column({ name: 'pays_origine', length: 5, nullable: true })
  paysOrigine: string;

  @OneToMany(() => Reservation, (reservation) => reservation.vehicule)
  reservations: Reservation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
