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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
const typeorm_1 = require("typeorm");
const type_reservation_enum_1 = require("../../common/enums/type-reservation.enum");
const statut_reservation_enum_1 = require("../../common/enums/statut-reservation.enum");
const user_entity_1 = require("../../users/entities/user.entity");
const vehicule_entity_1 = require("../../vehicules/entities/vehicule.entity");
let Reservation = class Reservation {
    id;
    utilisateur;
    vehicule;
    type;
    nom;
    telephone;
    email;
    dateDebut;
    dateFin;
    adresse;
    prix;
    statut;
    modePaiement;
    whatsappEnvoye;
    dateValidation;
    numeroTransaction;
    paiementValide;
    createdAt;
    updatedAt;
};
exports.Reservation = Reservation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reservation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.reservations, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'utilisateur_id' }),
    __metadata("design:type", user_entity_1.User)
], Reservation.prototype, "utilisateur", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicule_entity_1.Vehicule, (vehicule) => vehicule.reservations, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'vehicule_id' }),
    __metadata("design:type", vehicule_entity_1.Vehicule)
], Reservation.prototype, "vehicule", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: type_reservation_enum_1.TypeReservation,
    }),
    __metadata("design:type", String)
], Reservation.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Reservation.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Reservation.prototype, "telephone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reservation.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_debut', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "dateDebut", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_fin', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "dateFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Reservation.prototype, "prix", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: statut_reservation_enum_1.StatutReservation,
        default: statut_reservation_enum_1.StatutReservation.EN_ATTENTE,
    }),
    __metadata("design:type", String)
], Reservation.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mode_paiement', length: 30, nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "modePaiement", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'whatsapp_envoye', default: false }),
    __metadata("design:type", Boolean)
], Reservation.prototype, "whatsappEnvoye", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_validation', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Reservation.prototype, "dateValidation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_transaction', length: 100, nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "numeroTransaction", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paiement_valide', default: false }),
    __metadata("design:type", Boolean)
], Reservation.prototype, "paiementValide", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Reservation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Reservation.prototype, "updatedAt", void 0);
exports.Reservation = Reservation = __decorate([
    (0, typeorm_1.Entity)('reservations')
], Reservation);
//# sourceMappingURL=reservation.entity.js.map