import { Controller, Get, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  fakeValue = 'This is my name';

  @Get('get-string-cache')
  async getSimpleString() {
    var value = await this.cacheManager.get('my-string');
    if(value) {
      return {
        data: value,
        loadFrom: 'redis cache'
      }
    }

    await this.cacheManager.set('my-string', this.fakeValue, {ttl: 300});
    return {
      data: this.fakeValue,
      loadFrom: 'fake database'
    }
  }
}
