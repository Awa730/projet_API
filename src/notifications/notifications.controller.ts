import { Controller, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('notifications')
@ApiBearerAuth('access-token')
@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // GET /notifications -> notifications de l'admin connecte (ex: cloche AdminDashboard.tsx)
  @Get()
  @ApiOperation({ summary: 'Lister les notifications de l\'admin connecte' })
  @ApiResponse({ status: 200, description: 'Liste des notifications' })
  findAllForMe(@CurrentUser() user: { id: number }) {
    return this.notificationsService.findAllForUser(user.id);
  }

  // PATCH /notifications/:id/lu -> marque une notification comme lue
  @Patch(':id/lu')
  @ApiOperation({ summary: 'Marquer une notification comme lue' })
  @ApiResponse({ status: 200, description: 'Notification marquee comme lue' })
  @ApiResponse({ status: 404, description: 'Notification introuvable' })
  marquerCommeLue(@Param('id', ParseIntPipe) id: number) {
    return this.notificationsService.marquerCommeLue(id);
  }
}
