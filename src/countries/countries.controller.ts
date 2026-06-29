import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  // GET /countries/:code -> infos pays via l'API externe REST Countries
  // Exemple: GET /countries/DE pour l'Allemagne (utilise pour BMW, Mercedes...)
  @Public()
  @Get(':code')
  @ApiOperation({
    summary:
      "Recuperer les informations d'un pays (API externe REST Countries)",
    description:
      "Exemple: /countries/DE pour l'Allemagne, /countries/JP pour le Japon",
  })
  @ApiResponse({ status: 200, description: 'Informations du pays' })
  @ApiResponse({ status: 404, description: 'Code pays inconnu' })
  @ApiResponse({ status: 502, description: 'API REST Countries indisponible' })
  findByCode(@Param('code') code: string) {
    return this.countriesService.findByCode(code);
  }
}
