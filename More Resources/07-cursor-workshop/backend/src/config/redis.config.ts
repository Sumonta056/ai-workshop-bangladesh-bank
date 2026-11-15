import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Injectable()
export class RedisConfig {
  private client: ReturnType<typeof createClient>;

  constructor(private configService: ConfigService) {}

  async getClient() {
    if (!this.client) {
      this.client = createClient({
        url:
          this.configService.get('REDIS_URL') ||
          'redis://:workshop123@localhost:6379',
      });

      this.client.on('error', (err) => console.error('Redis Client Error', err));
      this.client.on('connect', () => console.log('✅ Redis connected'));

      await this.client.connect();
    }
    return this.client;
  }

  async closeClient() {
    if (this.client) {
      await this.client.quit();
    }
  }
}
