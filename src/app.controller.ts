import { Controller, Get, Inject, CACHE_MANAGER, Delete } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';
import { Profile } from './model/profile';

@Controller()
export class AppController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  fakeValue = 'This is my name';
  fakeModel: Profile={
    name: 'tester',
    email: 'tester@gmail.com'
  }

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

  @Get('get-object-cache')
  async getObject() {
    var value = await this.cacheManager.get<Profile>('my-object');
    if(value){
      return {
        data: value,
        loadFrom: 'redis cache'
      }
    }
    await this.cacheManager.set<Profile>('my-object', this.fakeModel, {ttl: 300});
    return {
      data: this.fakeModel,
      loadFrom: 'fake database'
    }
  }

  @Get('delete-cache')
  async deleteCache() {
    // await this.cacheManager.del('my-object');
    await this.cacheManager.reset();
  }
}
