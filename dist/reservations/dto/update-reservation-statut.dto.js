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
exports.UpdateReservationStatutDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const statut_reservation_enum_1 = require("../../common/enums/statut-reservation.enum");
class UpdateReservationStatutDto {
    statut;
    modePaiement;
    numeroTransaction;
    paiementValide;
    whatsappEnvoye;
}
exports.UpdateReservationStatutDto = UpdateReservationStatutDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: statut_reservation_enum_1.StatutReservation, example: statut_reservation_enum_1.StatutReservation.CONFIRMEE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(statut_reservation_enum_1.StatutReservation),
    __metadata("design:type", String)
], UpdateReservationStatutDto.prototype, "statut", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Wave' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReservationStatutDto.prototype, "modePaiement", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'TXN123456789' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReservationStatutDto.prototype, "numeroTransaction", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateReservationStatutDto.prototype, "paiementValide", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateReservationStatutDto.prototype, "whatsappEnvoye", void 0);
//# sourceMappingURL=update-reservation-statut.dto.js.map