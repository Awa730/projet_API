import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Inscription cote client (ex: SignUp.tsx) -> role client force
  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto, Role.CLIENT);
    return this.buildAuthResponse(user.id, user.email, user.role, user.nom);
  }

  // Connexion commune client/admin (ex: LoginForm.tsx) -> le role vient de la BDD
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const motDePasseValide = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!motDePasseValide) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    return this.buildAuthResponse(user.id, user.email, user.role, user.nom);
  }

  private buildAuthResponse(
    id: number,
    email: string,
    role: Role,
    nom: string,
  ) {
    const payload = { sub: id, email, role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id, nom, email, role },
    };
  }
}
