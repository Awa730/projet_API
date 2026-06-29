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
exports.ExchangeRateService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let ExchangeRateService = class ExchangeRateService {
    httpService;
    baseUrl = 'https://open.er-api.com/v6/latest/XOF';
    constructor(httpService) {
        this.httpService = httpService;
    }
    async convertir(montantFcfa, devise) {
        const deviseNormalisee = devise.toUpperCase();
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(this.baseUrl));
            const taux = response.data?.rates?.[deviseNormalisee];
            if (!taux) {
                throw new common_1.NotFoundException(`Devise "${devise}" non reconnue ou indisponible`);
            }
            return {
                devise: deviseNormalisee,
                montantFcfa,
                montantConverti: Math.round(montantFcfa * taux * 100) / 100,
                taux,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            const axiosError = error;
            throw new common_1.BadGatewayException("Impossible de contacter l'API ExchangeRate pour le moment" +
                (axiosError.message ? ` (${axiosError.message})` : ''));
        }
    }
    async listerTaux() {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(this.baseUrl));
            return response.data?.rates || {};
        }
        catch (error) {
            throw new common_1.BadGatewayException("Impossible de contacter l'API ExchangeRate pour le moment");
        }
    }
};
exports.ExchangeRateService = ExchangeRateService;
exports.ExchangeRateService = ExchangeRateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ExchangeRateService);
//# sourceMappingURL=exchange-rate.service.js.map