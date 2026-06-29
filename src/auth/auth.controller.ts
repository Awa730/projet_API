import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/register -> inscription client (correspond a SignUp.tsx)
  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Inscription d\'un nouveau client' })
  @ApiResponse({ status: 201, description: 'Compte cree, retourne le token JWT et le profil' })
  @ApiResponse({ status: 409, description: 'Un compte existe deja avec cet email' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // POST /auth/login -> connexion client ou admin (correspond a LoginForm.tsx)
  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Connexion (client ou admin)' })
  @ApiResponse({ status: 200, description: 'Connexion reussie, retourne le token JWT et le profil' })
  @ApiResponse({ status: 401, description: 'Email ou mot de passe incorrect' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
