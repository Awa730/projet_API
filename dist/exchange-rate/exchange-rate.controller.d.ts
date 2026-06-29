import { ExchangeRateService } from './exchange-rate.service';
export declare class ExchangeRateController {
    private readonly exchangeRateService;
    constructor(exchangeRateService: ExchangeRateService);
    listerTaux(): Promise<Record<string, number>>;
    convertir(montant: number, devise?: string): Promise<import("./exchange-rate.service").ConversionResult>;
}
