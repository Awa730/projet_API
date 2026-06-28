import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { VehiculesService } from './vehicules.service';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { Role } from '../common/enums/role.enum';
import { CountriesService } from '../countries/countries.service';

@ApiTags('vehicules')
@Controller('vehicules')
export class VehiculesController {
  constructor(
    private readonly vehiculesService: VehiculesService,
    private readonly countriesService: CountriesService,
  ) {}

  // GET /vehicules -> liste publique (correspond a VehiculesSection.tsx sur la landing page)
  @Public()
  @Get()
  @ApiOperation({ summary: 'Lister tous les vehicules (catalogue public)' })
  @ApiResponse({ status: 200, description: 'Liste des vehicules' })
  findAll() {
    return this.vehiculesService.findAll();
  }

  // GET /vehicules/:id/origine -> details + infos du pays d'origine (API REST Countries)
  // Doit etre declare avant GET /vehicules/:id pour ne pas etre intercepte
  @Public()
  @Get(':id/origine')
  @ApiOperation({
    summary:
      "Details d'un vehicule + pays d'origine (API externe REST Countries)",
  })
  @ApiResponse({
    status: 200,
    description: "Vehicule et informations du pays d'origine",
  })
  @ApiResponse({ status: 404, description: 'Vehicule ou pays introuvable' })
  @ApiResponse({ status: 502, description: 'API REST Countries indisponible' })
  async findOrigine(@Param('id', ParseIntPipe) id: number) {
    const vehicule = await this.vehiculesService.findOne(id);
    if (!vehicule.paysOrigine) {
      return { vehicule, pays: null };
    }
    const pays = await this.countriesService.findByCode(vehicule.paysOrigine);
    return { vehicule, pays };
  }

  // GET /vehicules/:id -> details publics d'un vehicule
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Recuperer un vehicule par son id' })
  @ApiResponse({ status: 200, description: 'Vehicule trouve' })
  @ApiResponse({ status: 404, description: 'Vehicule introuvable' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehiculesService.findOne(id);
  }

  // POST /vehicules -> creation (admin uniquement, ex: AdminDashboard.tsx)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Creer un vehicule (admin uniquement)' })
  @ApiResponse({ status: 201, description: 'Vehicule cree' })
  @ApiResponse({
    status: 403,
    description: 'Acces reserve aux administrateurs',
  })
  create(@Body() dto: CreateVehiculeDto) {
    return this.vehiculesService.create(dto);
  }

  // PATCH /vehicules/:id -> mise a jour (admin uniquement)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Mettre a jour un vehicule (admin uniquement)' })
  @ApiResponse({ status: 200, description: 'Vehicule mis a jour' })
  @ApiResponse({ status: 404, description: 'Vehicule introuvable' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVehiculeDto,
  ) {
    return this.vehiculesService.update(id, dto);
  }

  // DELETE /vehicules/:id -> suppression (admin uniquement)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Supprimer un vehicule (admin uniquement)' })
  @ApiResponse({ status: 200, description: 'Vehicule supprime' })
  @ApiResponse({ status: 404, description: 'Vehicule introuvable' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehiculesService.remove(id);
  }
}
