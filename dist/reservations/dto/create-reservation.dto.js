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
exports.CreateReservationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const type_reservation_enum_1 = require("../../common/enums/type-reservation.enum");
class CreateReservationDto {
    vehiculeId;
    type;
    nom;
    telephone;
    email;
    dateDebut;
    dateFin;
    adresse;
}
exports.CreateReservationDto = CreateReservationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Id du vehicule concerne' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateReservationDto.prototype, "vehiculeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: type_reservation_enum_1.TypeReservation, example: type_reservation_enum_1.TypeReservation.LOCATION }),
    (0, class_validator_1.IsEnum)(type_reservation_enum_1.TypeReservation),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Awa Diop' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+221771234567' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "telephone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'awa.diop@example.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email invalide' }),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-07-01',
        description: 'Obligatoire si type = location',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "dateDebut", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-07-05',
        description: 'Obligatoire si type = location',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "dateFin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Sacré-Coeur 3, Dakar',
        description: 'Obligatoire si type = achat (adresse de livraison)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "adresse", void 0);
//# sourceMappingURL=create-reservation.dto.js.map