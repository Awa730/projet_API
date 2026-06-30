import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

export interface GooglePayload {
  googleId: string;
  email: string;
  nom: string;
}

@Injectable()
export class GoogleAuthService {
  private readonly client: OAuth2Client;

  constructor(private readonly configService: ConfigService) {
    // Le Client ID doit correspondre exactement a celui utilise par le
    // composant <GoogleLogin> du frontend (@react-oauth/google), sinon
    // la verification de signature echoue.
    this.client = new OAuth2Client(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
    );
  }

  // Verifie la signature et l'audience du jeton credential envoye par le
  // frontend. Ne fait JAMAIS confiance a un decodage cote client : la
  // verification de la signature Google se fait uniquement ici, cote serveur.
  async verifierCredential(credential: string): Promise<GooglePayload> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: credential,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        throw new UnauthorizedException('Jeton Google invalide');
      }

      return {
        googleId: payload.sub,
        email: payload.email,
        nom: payload.name || payload.email.split('@')[0],
      };
    } catch {
      throw new UnauthorizedException(
        'Jeton Google invalide ou expire',
      );
    }
  }
}
