import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('users')
@ApiBearerAuth('access-token')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users -> liste de tous les utilisateurs (admin uniquement)
  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Lister tous les utilisateurs (admin uniquement)' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs' })
  @ApiResponse({
    status: 403,
    description: 'Acces reserve aux administrateurs',
  })
  findAll() {
    return this.usersService.findAll();
  }

  // GET /users/me -> profil de l'utilisateur connecte (client ou admin)
  @Get('me')
  @ApiOperation({ summary: "Recuperer le profil de l'utilisateur connecte" })
  @ApiResponse({ status: 200, description: "Profil de l'utilisateur connecte" })
  findMe(@CurrentUser() user: { id: number }) {
    return this.usersService.findOne(user.id);
  }

  // PATCH /users/me -> mise a jour du profil connecte (ex: ClientProfile.tsx)
  @Patch('me')
  @ApiOperation({
    summary: "Mettre a jour le profil de l'utilisateur connecte",
  })
  @ApiResponse({ status: 200, description: 'Profil mis a jour' })
  updateMe(@CurrentUser() user: { id: number }, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(user.id, dto);
  }

  // GET /users/:id -> consultation d'un utilisateur precis (admin uniquement)
  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Recuperer un utilisateur par son id (admin uniquement)',
  })
  @ApiResponse({ status: 200, description: 'Utilisateur trouve' })
  @ApiResponse({ status: 404, description: 'Utilisateur introuvable' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // DELETE /users/:id -> suppression d'un compte (admin uniquement)
  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Supprimer un utilisateur (admin uniquement)' })
  @ApiResponse({ status: 200, description: 'Utilisateur supprime' })
  @ApiResponse({ status: 404, description: 'Utilisateur introuvable' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
