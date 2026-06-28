/**
 * Service principal de l'application.
 * Fournit le message de sante de l'API pour verifier que le backend est operationnel.
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Retourne un message indiquant que l'API est operationnelle.
   * Utilise par la route GET /api (health check public).
   */
  getHello(): string {
    return 'Movia Automobile API - Backend NestJS operationnel';
  }
}
