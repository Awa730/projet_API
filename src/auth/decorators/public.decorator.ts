import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

// Usage: @Public() au-dessus d'une route pour la rendre accessible sans token JWT
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
