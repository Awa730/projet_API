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
exports.CreateVehiculeDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const statut_vehicule_enum_1 = require("../../common/enums/statut-vehicule.enum");
class CreateVehiculeDto {
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
}
exports.CreateVehiculeDto = CreateVehiculeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BMW X3' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le nom du vehicule est obligatoire' }),
    __metadata("design:type", String)
], CreateVehiculeDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SUV' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVehiculeDto.prototype, "categorie", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateVehiculeDto.prototype, "places", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Diesel' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVehiculeDto.prototype, "carburant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Automatique' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVehiculeDto.prototype, "boite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2022 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1900),
    __metadata("design:type", Number)
], CreateVehiculeDto.prototype, "annee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2.0L TwinPower' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVehiculeDto.prototype, "moteur", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '230 km/h' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVehiculeDto.prototype, "vitesseMax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '190 ch' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVehiculeDto.prototype, "puissance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8,0 s' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVehiculeDto.prototype, "acceleration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Voyage, famille et rendez-vous pro' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVehiculeDto.prototype, "usageIdeal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Confort premium', 'Tenue de route', 'Grand coffre'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateVehiculeDto.prototype, "pointsForts", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: statut_vehicule_enum_1.StatutVehicule, example: statut_vehicule_enum_1.StatutVehicule.AVAILABLE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(statut_vehicule_enum_1.StatutVehicule),
    __metadata("design:type", String)
], CreateVehiculeDto.prototype, "statut", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 65000, description: 'Prix de location par jour (FCFA)' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateVehiculeDto.prototype, "prixLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 22000000, description: 'Prix d\'achat (FCFA)' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateVehiculeDto.prototype, "prixAchat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/images/BMW X3.jpeg' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVehiculeDto.prototype, "image", void 0);
//# sourceMappingURL=create-vehicule.dto.js.map