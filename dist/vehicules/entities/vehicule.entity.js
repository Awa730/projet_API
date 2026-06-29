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
exports.Vehicule = void 0;
const typeorm_1 = require("typeorm");
const statut_vehicule_enum_1 = require("../../common/enums/statut-vehicule.enum");
const reservation_entity_1 = require("../../reservations/entities/reservation.entity");
let Vehicule = class Vehicule {
    id;
    nom;
    categorie;
    places;
    carburant;
    boite;
    annee;
    moteur;
    vitesseMax;
    puissance;
    acceleration;
    usageIdeal;
    pointsForts;
    statut;
    prixLocation;
    prixAchat;
    image;
    reservations;
    createdAt;
    updatedAt;
};
exports.Vehicule = Vehicule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vehicule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Vehicule.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Vehicule.prototype, "categorie", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vehicule.prototype, "places", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], Vehicule.prototype, "carburant", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], Vehicule.prototype, "boite", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vehicule.prototype, "annee", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Vehicule.prototype, "moteur", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vitesse_max', length: 30 }),
    __metadata("design:type", String)
], Vehicule.prototype, "vitesseMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], Vehicule.prototype, "puissance", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], Vehicule.prototype, "acceleration", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usage_ideal', type: 'text' }),
    __metadata("design:type", String)
], Vehicule.prototype, "usageIdeal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'points_forts', type: 'json' }),
    __metadata("design:type", Array)
], Vehicule.prototype, "pointsForts", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: statut_vehicule_enum_1.StatutVehicule,
        default: statut_vehicule_enum_1.StatutVehicule.AVAILABLE,
    }),
    __metadata("design:type", String)
], Vehicule.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prix_location', type: 'int' }),
    __metadata("design:type", Number)
], Vehicule.prototype, "prixLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prix_achat', type: 'int' }),
    __metadata("design:type", Number)
], Vehicule.prototype, "prixAchat", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicule.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_entity_1.Reservation, (reservation) => reservation.vehicule),
    __metadata("design:type", Array)
], Vehicule.prototype, "reservations", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Vehicule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Vehicule.prototype, "updatedAt", void 0);
exports.Vehicule = Vehicule = __decorate([
    (0, typeorm_1.Entity)('vehicules')
], Vehicule);
//# sourceMappingURL=vehicule.entity.js.map