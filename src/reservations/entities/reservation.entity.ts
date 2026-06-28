import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TypeReservation } from '../../common/enums/type-reservation.enum';
import { StatutReservation } from '../../common/enums/statut-reservation.enum';
import { User } from '../../users/entities/user.entity';
import { Vehicule } from '../../vehicules/entities/vehicule.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'utilisateur_id' })
  utilisateur: User;

  @ManyToOne(() => Vehicule, (vehicule) => vehicule.reservations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicule_id' })
  vehicule: Vehicule;

  @Column({
    type: 'enum',
    enum: TypeReservation,
  })
  type: TypeReservation;

  // Coordonnees du client au moment de la reservation (utiles pour
  // contacter meme si le profil utilisateur change par la suite)
  @Column({ length: 100 })
  nom: string;

  @Column({ length: 20 })
  telephone: string;

  @Column()
  email: string;

  // Utilises uniquement pour les reservations de type location
  @Column({ name: 'date_debut', type: 'date', nullable: true })
  dateDebut: string;

  @Column({ name: 'date_fin', type: 'date', nullable: true })
  dateFin: string;

  // Utilise uniquement pour les reservations de type achat (livraison)
  @Column({ type: 'text', nullable: true })
  adresse: string;

  // Prix unitaire (par jour pour une location, prix total pour un achat)
  @Column({ type: 'int' })
  prix: number;

  @Column({
    type: 'enum',
    enum: StatutReservation,
    default: StatutReservation.EN_ATTENTE,
  })
  statut: StatutReservation;

  @Column({ name: 'mode_paiement', length: 30, nullable: true })
  modePaiement: string;

  @Column({ name: 'whatsapp_envoye', default: false })
  whatsappEnvoye: boolean;

  @Column({ name: 'date_validation', type: 'datetime', nullable: true })
  dateValidation: Date;

  @Column({ name: 'numero_transaction', length: 100, nullable: true })
  numeroTransaction: string;

  @Column({ name: 'paiement_valide', default: false })
  paiementValide: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
