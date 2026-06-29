import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Movia Automobile API - Backend NestJS operationnel';
  }
}
