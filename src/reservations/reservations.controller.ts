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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationStatutDto } from './dto/update-reservation-statut.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('reservations')
@ApiBearerAuth('access-token')
@Controller('reservations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // POST /reservations -> creation par le client connecte
  @Post()
  @ApiOperation({ summary: 'Creer une reservation (location ou achat)' })
  @ApiResponse({ status: 201, description: 'Reservation creee' })
  @ApiResponse({ status: 400, description: 'Donnees incoherentes (ex: dates manquantes pour une location)' })
  create(
    @CurrentUser() user: { id: number },
    @Body() dto: CreateReservationDto,
  ) {
    return this.reservationsService.create(user.id, dto);
  }

  // GET /reservations -> liste complete (admin uniquement, AdminDashboard.tsx)
  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Lister toutes les reservations (admin uniquement)' })
  @ApiResponse({ status: 200, description: 'Liste de toutes les reservations' })
  findAll() {
    return this.reservationsService.findAll();
  }

  // GET /reservations/me -> reservations du client connecte (UserDashboard.tsx)
  @Get('me')
  @ApiOperation({ summary: 'Lister les reservations de l\'utilisateur connecte' })
  @ApiResponse({ status: 200, description: 'Reservations de l\'utilisateur connecte' })
  findMine(@CurrentUser() user: { id: number }) {
    return this.reservationsService.findAllForUser(user.id);
  }

  // GET /reservations/:id -> un client voit les siennes, un admin voit tout
  @Get(':id')
  @ApiOperation({ summary: 'Recuperer une reservation par son id' })
  @ApiResponse({ status: 200, description: 'Reservation trouvee' })
  @ApiResponse({ status: 403, description: 'Acces refuse a cette reservation' })
  @ApiResponse({ status: 404, description: 'Reservation introuvable' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: number; role: Role },
  ) {
    return this.reservationsService.findOneForRequester(id, user);
  }

  // PATCH /reservations/:id -> mise a jour statut/paiement (admin uniquement)
  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Mettre a jour le statut/paiement d\'une reservation (admin uniquement)' })
  @ApiResponse({ status: 200, description: 'Reservation mise a jour' })
  @ApiResponse({ status: 404, description: 'Reservation introuvable' })
  updateStatut(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReservationStatutDto,
  ) {
    return this.reservationsService.updateStatut(id, dto);
  }

  // DELETE /reservations/:id -> suppression (admin uniquement)
  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Supprimer une reservation (admin uniquement)' })
  @ApiResponse({ status: 200, description: 'Reservation supprimee' })
  @ApiResponse({ status: 404, description: 'Reservation introuvable' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.remove(id);
  }
}
