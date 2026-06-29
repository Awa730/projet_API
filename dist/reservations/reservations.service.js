"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservation_entity_1 = require("./entities/reservation.entity");
const vehicules_service_1 = require("../vehicules/vehicules.service");
const users_service_1 = require("../users/users.service");
const notifications_service_1 = require("../notifications/notifications.service");
const type_reservation_enum_1 = require("../common/enums/type-reservation.enum");
const statut_reservation_enum_1 = require("../common/enums/statut-reservation.enum");
const role_enum_1 = require("../common/enums/role.enum");
let ReservationsService = class ReservationsService {
    reservationsRepository;
    vehiculesService;
    usersService;
    notificationsService;
    constructor(reservationsRepository, vehiculesService, usersService, notificationsService) {
        this.reservationsRepository = reservationsRepository;
        this.vehiculesService = vehiculesService;
        this.usersService = usersService;
        this.notificationsService = notificationsService;
    }
    async create(userId, dto) {
        if (dto.type === type_reservation_enum_1.TypeReservation.LOCATION && (!dto.dateDebut || !dto.dateFin)) {
            throw new common_1.BadRequestException('Les dates de debut et de fin sont obligatoires pour une location');
        }
        if (dto.type === type_reservation_enum_1.TypeReservation.ACHAT && !dto.adresse) {
            throw new common_1.BadRequestException("L'adresse de livraison est obligatoire pour un achat");
        }
        const utilisateur = await this.usersService.findOne(userId);
        const vehicule = await this.vehiculesService.findOne(dto.vehiculeId);
        const prix = dto.type === type_reservation_enum_1.TypeReservation.LOCATION
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
            statut: statut_reservation_enum_1.StatutReservation.EN_ATTENTE,
        });
        const saved = await this.reservationsRepository.save(reservation);
        await this.notifierAdmins(saved);
        return saved;
    }
    async notifierAdmins(reservation) {
        const tousLesUsers = await this.usersService.findAll();
        const admins = tousLesUsers.filter((u) => u.role === role_enum_1.Role.ADMIN);
        const message = `Nouvelle ${reservation.type === type_reservation_enum_1.TypeReservation.LOCATION ? 'reservation' : 'commande'} de ${reservation.nom} pour ${reservation.vehicule.nom}`;
        await Promise.all(admins.map((admin) => this.notificationsService.create(admin, message, {
            client: reservation.nom,
            vehicule: reservation.vehicule.nom,
            montant: String(reservation.prix),
            reservationId: String(reservation.id),
        })));
    }
    findAll() {
        return this.reservationsRepository.find({
            relations: { utilisateur: true, vehicule: true },
            order: { createdAt: 'DESC' },
        });
    }
    findAllForUser(userId) {
        return this.reservationsRepository.find({
            where: { utilisateur: { id: userId } },
            relations: { vehicule: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const reservation = await this.reservationsRepository.findOne({
            where: { id },
            relations: { utilisateur: true, vehicule: true },
        });
        if (!reservation) {
            throw new common_1.NotFoundException(`Reservation #${id} introuvable`);
        }
        return reservation;
    }
    async findOneForRequester(id, requester) {
        const reservation = await this.findOne(id);
        if (requester.role !== role_enum_1.Role.ADMIN &&
            reservation.utilisateur.id !== requester.id) {
            throw new common_1.ForbiddenException('Acces refuse a cette reservation');
        }
        return reservation;
    }
    async updateStatut(id, dto) {
        const reservation = await this.findOne(id);
        const passageAConfirmee = dto.statut === statut_reservation_enum_1.StatutReservation.CONFIRMEE &&
            reservation.statut !== statut_reservation_enum_1.StatutReservation.CONFIRMEE;
        Object.assign(reservation, dto);
        if (passageAConfirmee) {
            reservation.dateValidation = new Date();
        }
        return this.reservationsRepository.save(reservation);
    }
    async remove(id) {
        const reservation = await this.findOne(id);
        await this.reservationsRepository.remove(reservation);
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        vehicules_service_1.VehiculesService,
        users_service_1.UsersService,
        notifications_service_1.NotificationsService])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map