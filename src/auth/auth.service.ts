import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { GoogleAuthService } from './google/google-auth.service';
import { MailService } from '../mail/mail.service';
import { Role } from '../common/enums/role.enum';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly mailService: MailService,
  ) {}

  // Inscription cote client (ex: SignUp.tsx) -> role client force
  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto, Role.CLIENT);
    return this.buildAuthResponse(user);
  }

  // Connexion commune client/admin (ex: LoginForm.tsx) -> le role vient de la BDD
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user || !user.password) {
      // user.password est null pour les comptes crees uniquement via Google :
      // on renvoie le meme message que pour un email inconnu, pour ne pas
      // reveler si un compte Google existe deja pour cet email
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const motDePasseValide = await bcrypt.compare(loginDto.password, user.password);
    if (!motDePasseValide) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    return this.buildAuthResponse(user);
  }

  // Connexion ou inscription automatique via Google Sign-In
  // (ex: bouton GoogleLogin dans UserLoginPage.tsx)
  async loginWithGoogle(dto: GoogleLoginDto) {
    // La verification de signature se fait cote serveur via google-auth-library,
    // jamais en faisant confiance au decodage cote client du frontend.
    const googlePayload = await this.googleAuthService.verifierCredential(
      dto.credential,
    );

    const user = await this.usersService.findOrCreateFromGoogle({
      nom: googlePayload.nom,
      email: googlePayload.email,
      googleId: googlePayload.googleId,
    });

    return this.buildAuthResponse(user);
  }

  // Demande de reinitialisation de mot de passe (ex: ForgotPassword.tsx)
  // Ne revele jamais si l'email existe ou non, pour eviter l'enumeration de comptes.
  async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(dto.email);

    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      await this.usersService.setResetToken(user.id, token);
      await this.mailService.envoyerLienReinitialisation(user.email, token);
    }

    return {
      message:
        'Si un compte existe avec cet email, un lien de reinitialisation a ete envoye.',
    };
  }

  // Application du nouveau mot de passe a partir du jeton recu par email
  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const user = await this.usersService.findByValidResetToken(dto.token);
    if (!user) {
      throw new UnauthorizedException(
        'Jeton de reinitialisation invalide ou expire',
      );
    }

    await this.usersService.resetPassword(user.id, dto.nouveauMotDePasse);
    return { message: 'Mot de passe reinitialise avec succes' };
  }

  private buildAuthResponse(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: user.role,
      },
    };
  }
}
