import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export interface PaysInfo {
  nomFrancais: string;
  nomCommun: string;
  capitale: string;
  region: string;
  drapeau: string;
  population: number;
}

interface RestCountriesResponse {
  name: { common: string };
  translations?: { fra?: { common: string } };
  capital?: string[];
  region: string;
  flags?: { svg?: string; png?: string };
  population: number;
}

@Injectable()
export class CountriesService {
  // API externe gratuite REST Countries, utilisee pour afficher le pays
  // d'origine de la marque d'un vehicule (cf. champ paysOrigine de l'entite Vehicule)
  private readonly baseUrl = 'https://restcountries.com/v3.1';

  constructor(private readonly httpService: HttpService) {}

  async findByCode(code: string): Promise<PaysInfo> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/alpha/${code}`),
      );

      const pays = Array.isArray(response.data)
        ? (response.data[0] as RestCountriesResponse)
        : (response.data as RestCountriesResponse);

      return {
        nomFrancais: pays.translations?.fra?.common || pays.name.common,
        nomCommun: pays.name.common,
        capitale: pays.capital?.[0] || 'N/A',
        region: pays.region,
        drapeau: pays.flags?.svg || pays.flags?.png,
        population: pays.population,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new NotFoundException(`Aucun pays trouve pour le code "${code}"`);
      }
      throw new BadGatewayException(
        "Impossible de contacter l'API REST Countries pour le moment",
      );
    }
  }
}
