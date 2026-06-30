import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
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

  // POST /auth/google -> connexion ou inscription automatique via Google
  // (correspond au bouton GoogleLogin dans UserLoginPage.tsx)
  @Public()
  @Post('google')
  @ApiOperation({ summary: 'Connexion via Google Sign-In (cree le compte si besoin)' })
  @ApiResponse({ status: 200, description: 'Connexion reussie, retourne le token JWT et le profil' })
  @ApiResponse({ status: 401, description: 'Jeton Google invalide ou expire' })
  loginWithGoogle(@Body() dto: GoogleLoginDto) {
    return this.authService.loginWithGoogle(dto);
  }

  // POST /auth/forgot-password -> demande de lien de reinitialisation
  // (correspond a ForgotPassword.tsx)
  @Public()
  @Post('forgot-password')
  @ApiOperation({ summary: 'Demander un lien de reinitialisation de mot de passe' })
  @ApiResponse({ status: 200, description: 'Lien envoye si le compte existe (reponse generique)' })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  // POST /auth/reset-password -> applique le nouveau mot de passe via le jeton
  @Public()
  @Post('reset-password')
  @ApiOperation({ summary: 'Reinitialiser le mot de passe avec le jeton recu par email' })
  @ApiResponse({ status: 200, description: 'Mot de passe reinitialise avec succes' })
  @ApiResponse({ status: 401, description: 'Jeton invalide ou expire' })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
