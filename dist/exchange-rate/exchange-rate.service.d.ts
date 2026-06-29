import { HttpService } from '@nestjs/axios';
export interface ConversionResult {
    devise: string;
    montantFcfa: number;
    montantConverti: number;
    taux: number;
}
export declare class ExchangeRateService {
    private readonly httpService;
    private readonly baseUrl;
    constructor(httpService: HttpService);
    convertir(montantFcfa: number, devise: string): Promise<ConversionResult>;
    listerTaux(): Promise<Record<string, number>>;
}
