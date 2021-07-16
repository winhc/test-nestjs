import { Injectable, Logger } from '@nestjs/common';

const logger = new Logger('Service');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!, This is NestJS';
  }
}
