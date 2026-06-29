import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export interface ConversionResult {
  devise: string;
  montantFcfa: number;
  montantConverti: number;
  taux: number;
}

@Injectable()
export class ExchangeRateService {
  // API externe gratuite ExchangeRate-API, utilisee pour convertir les prix
  // des vehicules (stockes en FCFA) vers d'autres devises (EUR, USD, etc.)
  // Documentation: https://www.exchangerate-api.com/docs/free
  private readonly baseUrl = 'https://open.er-api.com/v6/latest/XOF';

  constructor(private readonly httpService: HttpService) {}

  // Convertit un montant en FCFA (XOF) vers la devise demandee
  // Exemple: convertir(22000000, 'EUR') -> prix de la BMW X3 en euros
  async convertir(montantFcfa: number, devise: string): Promise<ConversionResult> {
    const deviseNormalisee = devise.toUpperCase();

    try {
      const response = await firstValueFrom(
        this.httpService.get(this.baseUrl),
      );

      const taux = response.data?.rates?.[deviseNormalisee];

      if (!taux) {
        throw new NotFoundException(
          `Devise "${devise}" non reconnue ou indisponible`,
        );
      }

      return {
        devise: deviseNormalisee,
        montantFcfa,
        montantConverti: Math.round(montantFcfa * taux * 100) / 100,
        taux,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      const axiosError = error as AxiosError;
      throw new BadGatewayException(
        "Impossible de contacter l'API ExchangeRate pour le moment" +
          (axiosError.message ? ` (${axiosError.message})` : ''),
      );
    }
  }

  // Renvoie la liste complete des taux disponibles depuis le FCFA (XOF)
  async listerTaux(): Promise<Record<string, number>> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.baseUrl),
      );
      return response.data?.rates || {};
    } catch (error) {
      throw new BadGatewayException(
        "Impossible de contacter l'API ExchangeRate pour le moment",
      );
    }
  }
}
