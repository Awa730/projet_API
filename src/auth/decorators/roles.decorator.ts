import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common/enums/role.enum';

export const ROLES_KEY = 'roles';

// Usage: @Roles(Role.ADMIN) au-dessus d'une route pour la reserver aux admins
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
