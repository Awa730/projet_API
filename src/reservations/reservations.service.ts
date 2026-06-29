import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationStatutDto } from './dto/update-reservation-statut.dto';
import { VehiculesService } from '../vehicules/vehicules.service';
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';
import { TypeReservation } from '../common/enums/type-reservation.enum';
import { StatutReservation } from '../common/enums/statut-reservation.enum';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
    private readonly vehiculesService: VehiculesService,
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService,
  ) {}

  // Cree une reservation pour l'utilisateur connecte (client)
  // Correspond au flux de reservation cote VehiculesSection.tsx / UserDashboard.tsx
  async create(
    userId: number,
    dto: CreateReservationDto,
  ): Promise<Reservation> {
    if (dto.type === TypeReservation.LOCATION && (!dto.dateDebut || !dto.dateFin)) {
      throw new BadRequestException(
        'Les dates de debut et de fin sont obligatoires pour une location',
      );
    }
    if (dto.type === TypeReservation.ACHAT && !dto.adresse) {
      throw new BadRequestException(
        "L'adresse de livraison est obligatoire pour un achat",
      );
    }

    const utilisateur = await this.usersService.findOne(userId);
    const vehicule = await this.vehiculesService.findOne(dto.vehiculeId);

    const prix =
      dto.type === TypeReservation.LOCATION
        ? vehicule.prixLocation
        : vehicule.prixAchat;

    const reservation = this.reservationsRepository.create({
      utilisateur,
      vehicule,
      type: dto.type,
      nom: dto.nom,
      telephone: dto.telephone,
      email: dto.email,
      dateDebut: dto.dateDebut,
      dateFin: dto.dateFin,
      adresse: dto.adresse,
      prix,
      statut: StatutReservation.EN_ATTENTE,
    });

    const saved = await this.reservationsRepository.save(reservation);

    // Notifie tous les admins qu'une nouvelle reservation est en attente
    await this.notifierAdmins(saved);

    return saved;
  }

  // Notifie chaque admin existant (simple boucle, suffisant pour un MVP)
  private async notifierAdmins(reservation: Reservation): Promise<void> {
    const tousLesUsers = await this.usersService.findAll();
    const admins = tousLesUsers.filter((u) => u.role === Role.ADMIN);

    const message = `Nouvelle ${
      reservation.type === TypeReservation.LOCATION ? 'reservation' : 'commande'
    } de ${reservation.nom} pour ${reservation.vehicule.nom}`;

    await Promise.all(
      admins.map((admin) =>
        this.notificationsService.create(admin, message, {
          client: reservation.nom,
          vehicule: reservation.vehicule.nom,
          montant: String(reservation.prix),
          reservationId: String(reservation.id),
        }),
      ),
    );
  }

  // Liste complete (admin uniquement) -> AdminDashboard.tsx
  findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      relations: { utilisateur: true, vehicule: true },
      order: { createdAt: 'DESC' },
    });
  }

  // Reservations du client connecte -> UserDashboard.tsx
  findAllForUser(userId: number): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      where: { utilisateur: { id: userId } },
      relations: { vehicule: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id },
      relations: { utilisateur: true, vehicule: true },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation #${id} introuvable`);
    }
    return reservation;
  }

  // Un client ne peut consulter qu'une de ses propres reservations,
  // un admin peut tout consulter
  async findOneForRequester(
    id: number,
    requester: { id: number; role: Role },
  ): Promise<Reservation> {
    const reservation = await this.findOne(id);
    if (
      requester.role !== Role.ADMIN &&
      reservation.utilisateur.id !== requester.id
    ) {
      throw new ForbiddenException('Acces refuse a cette reservation');
    }
    return reservation;
  }

  // Mise a jour du statut/paiement -> admin uniquement (AdminDashboard.tsx)
  async updateStatut(
    id: number,
    dto: UpdateReservationStatutDto,
  ): Promise<Reservation> {
    const reservation = await this.findOne(id);

    const passageAConfirmee =
      dto.statut === StatutReservation.CONFIRMEE &&
      reservation.statut !== StatutReservation.CONFIRMEE;

    Object.assign(reservation, dto);

    if (passageAConfirmee) {
      reservation.dateValidation = new Date();
    }

    return this.reservationsRepository.save(reservation);
  }

  async remove(id: number): Promise<void> {
    const reservation = await this.findOne(id);
    await this.reservationsRepository.remove(reservation);
  }
}
