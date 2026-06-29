import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // GET /api -> route de sante pour verifier que l'API tourne
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
