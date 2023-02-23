import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('main')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getOk() {
    return 'main ok'
  }
  @Post()
  getOk2() {
    return 'main ok'
  }
}
