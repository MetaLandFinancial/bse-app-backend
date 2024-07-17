import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(): any {
    return {
      statusCode: 200,
      status: 'success',
      message: 'Test request in successfully',
      data: { },
    };
  }
}
