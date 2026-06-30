import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Role } from '../common/enums/role.enum';

export interface GoogleProfileInput {
  nom: string;
  email: string;
  googleId: string;
  telephone?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(registerDto: RegisterDto, role: Role = Role.CLIENT): Promise<User> {
    const existant = await this.findByEmail(registerDto.email);
    if (existant) {
      throw new ConflictException('Un compte existe deja avec cet email');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = this.usersRepository.create({
      nom: registerDto.nom,
      email: registerDto.email,
      password: hashedPassword,
      telephone: registerDto.telephone,
      role,
    });

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur #${id} introuvable`);
    }
    return user;
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  findByGoogleId(googleId: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { googleId } });
  }

  // Cree le compte au premier Google Sign-In, ou relie un compte existant
  // (meme email mais inscrit avant via le formulaire classique) a ce googleId.
  // Le role admin n'est jamais attribue automatiquement via Google.
  async findOrCreateFromGoogle(profile: GoogleProfileInput): Promise<User> {
    let user = await this.findByGoogleId(profile.googleId);
    if (user) {
      return user;
    }

    user = await this.findByEmail(profile.email);
    if (user) {
      user.googleId = profile.googleId;
      return this.usersRepository.save(user);
    }

    const nouveauUser = this.usersRepository.create({
      nom: profile.nom,
      email: profile.email,
      telephone: profile.telephone,
      googleId: profile.googleId,
      password: null,
      role: Role.CLIENT,
    });
    return this.usersRepository.save(nouveauUser);
  }

  async updateProfile(id: number, dto: UpdateProfileDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    return this.usersRepository.save(user);
  }

  // Enregistre le jeton de reinitialisation (valide 1h) sur le compte
  async setResetToken(userId: number, token: string): Promise<void> {
    await this.usersRepository.update(userId, {
      resetPasswordToken: token,
      resetPasswordExpires: new Date(Date.now() + 60 * 60 * 1000),
    });
  }

  // Retrouve un utilisateur par son jeton, uniquement s'il n'a pas expire
  findByValidResetToken(token: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: MoreThan(new Date()),
      },
    });
  }

  // Applique le nouveau mot de passe et invalide le jeton (usage unique)
  async resetPassword(userId: number, nouveauMotDePasse: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10);
    await this.usersRepository.update(userId, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
