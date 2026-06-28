import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  // Destinataire de la notification (en general un admin)
  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'utilisateur_id' })
  utilisateur: User;

  @Column({ default: false })
  lu: boolean;

  @Column({ type: 'text' })
  message: string;

  // Details libres lies a la notification (client, vehicule, montant, etc.)
  // stockes en JSON pour rester flexibles comme cote frontend
  @Column({ type: 'json', nullable: true })
  details: {
    client?: string;
    vehicule?: string;
    montant?: string;
    modePaiement?: string;
    numeroTransaction?: string;
    reservationId?: string;
  };

  @CreateDateColumn()
  createdAt: Date;
}
