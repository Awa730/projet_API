import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('SMTP_HOST');
    if (host) {
      this.transporter = nodemailer.createTransport({
        host,
        port: this.configService.get<number>('SMTP_PORT', 587),
        secure: false,
        auth: {
          user: this.configService.get<string>('SMTP_USER'),
          pass: this.configService.get<string>('SMTP_PASSWORD'),
        },
      });
    }
  }

  // Envoie le lien de reinitialisation. Si aucun SMTP n'est configure
  // (cas par defaut en developpement/examen), le lien est simplement
  // affiche dans les logs du serveur pour pouvoir tester le flux complet
  // sans avoir besoin d'une vraie boite mail.
  async envoyerLienReinitialisation(email: string, token: string): Promise<void> {
    const frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:5173',
    );
    const lien = `${frontendUrl}/reset-password?token=${token}`;

    if (!this.transporter) {
      this.logger.warn(
        `[MODE DEV] Aucun SMTP configure. Lien de reinitialisation pour ${email} : ${lien}`,
      );
      return;
    }

    await this.transporter.sendMail({
      from: this.configService.get<string>('SMTP_FROM', 'no-reply@movia-automobile.sn'),
      to: email,
      subject: 'Reinitialisation de votre mot de passe Movia Automobile',
      html: `
        <p>Bonjour,</p>
        <p>Vous avez demande la reinitialisation de votre mot de passe Movia Automobile.</p>
        <p><a href="${lien}">Cliquez ici pour choisir un nouveau mot de passe</a></p>
        <p>Ce lien est valable 1 heure. Si vous n'etes pas a l'origine de cette demande, ignorez cet email.</p>
      `,
    });
  }
}
