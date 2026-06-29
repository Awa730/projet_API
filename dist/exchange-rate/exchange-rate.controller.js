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
exports.ExchangeRateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const exchange_rate_service_1 = require("./exchange-rate.service");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let ExchangeRateController = class ExchangeRateController {
    exchangeRateService;
    constructor(exchangeRateService) {
        this.exchangeRateService = exchangeRateService;
    }
    listerTaux() {
        return this.exchangeRateService.listerTaux();
    }
    convertir(montant, devise = 'EUR') {
        return this.exchangeRateService.convertir(montant, devise);
    }
};
exports.ExchangeRateController = ExchangeRateController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('taux'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lister tous les taux de change depuis le FCFA (API externe ExchangeRate)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des taux de change' }),
    (0, swagger_1.ApiResponse)({ status: 502, description: 'API ExchangeRate indisponible' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExchangeRateController.prototype, "listerTaux", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('convertir/:montant'),
    (0, swagger_1.ApiOperation)({
        summary: 'Convertir un montant en FCFA vers une autre devise',
        description: 'Exemple: /exchange-rate/convertir/22000000?devise=EUR',
    }),
    (0, swagger_1.ApiParam)({ name: 'montant', example: 22000000, description: 'Montant en FCFA' }),
    (0, swagger_1.ApiQuery)({ name: 'devise', required: false, example: 'EUR' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Montant converti' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Devise non reconnue' }),
    (0, swagger_1.ApiResponse)({ status: 502, description: 'API ExchangeRate indisponible' }),
    __param(0, (0, common_1.Param)('montant', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('devise')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ExchangeRateController.prototype, "convertir", null);
exports.ExchangeRateController = ExchangeRateController = __decorate([
    (0, swagger_1.ApiTags)('exchange-rate'),
    (0, common_1.Controller)('exchange-rate'),
    __metadata("design:paramtypes", [exchange_rate_service_1.ExchangeRateService])
], ExchangeRateController);
//# sourceMappingURL=exchange-rate.controller.js.map