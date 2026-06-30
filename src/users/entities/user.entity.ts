import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Role } from '../../common/enums/role.enum';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Notification } from '../../notifications/entities/notification.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nom: string;

  @Column({ unique: true })
  email: string;

  // Le mot de passe est toujours stocke hashe (bcrypt), jamais en clair.
  // Null pour les comptes crees uniquement via Google (aucun mot de passe local).
  @Column({ type: 'varchar', nullable: true })
  password: string | null;

  @Column({ nullable: true, length: 20 })
  telephone: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
  })
  role: Role;

  // true si le compte a ete cree/relie via Google Sign-In
  @Column({ name: 'google_id', nullable: true, unique: true })
  googleId: string;

  // Jeton temporaire envoye par email pour reinitialiser le mot de passe
  @Column({ name: 'reset_password_token', type: 'varchar', nullable: true })
  resetPasswordToken: string | null;

  // Date d'expiration du jeton de reinitialisation (valable 1h)
  @Column({ name: 'reset_password_expires', type: 'datetime', nullable: true })
  resetPasswordExpires: Date | null;

  @OneToMany(() => Reservation, (reservation) => reservation.utilisateur)
  reservations: Reservation[];

  @OneToMany(() => Notification, (notification) => notification.utilisateur)
  notifications: Notification[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
