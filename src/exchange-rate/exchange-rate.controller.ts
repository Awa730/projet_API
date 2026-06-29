import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ExchangeRateService } from './exchange-rate.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('exchange-rate')
@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  // GET /exchange-rate/taux -> tous les taux de change depuis le FCFA (XOF)
  @Public()
  @Get('taux')
  @ApiOperation({
    summary: 'Lister tous les taux de change depuis le FCFA (API externe ExchangeRate)',
  })
  @ApiResponse({ status: 200, description: 'Liste des taux de change' })
  @ApiResponse({ status: 502, description: 'API ExchangeRate indisponible' })
  listerTaux() {
    return this.exchangeRateService.listerTaux();
  }

  // GET /exchange-rate/convertir/:montant?devise=EUR -> convertit un montant FCFA
  @Public()
  @Get('convertir/:montant')
  @ApiOperation({
    summary: 'Convertir un montant en FCFA vers une autre devise',
    description: 'Exemple: /exchange-rate/convertir/22000000?devise=EUR',
  })
  @ApiParam({ name: 'montant', example: 22000000, description: 'Montant en FCFA' })
  @ApiQuery({ name: 'devise', required: false, example: 'EUR' })
  @ApiResponse({ status: 200, description: 'Montant converti' })
  @ApiResponse({ status: 404, description: 'Devise non reconnue' })
  @ApiResponse({ status: 502, description: 'API ExchangeRate indisponible' })
  convertir(
    @Param('montant', ParseIntPipe) montant: number,
    @Query('devise') devise = 'EUR',
  ) {
    return this.exchangeRateService.convertir(montant, devise);
  }
}
