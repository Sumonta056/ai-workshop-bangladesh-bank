import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Service is healthy',
    schema: {
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
        uptime: { type: 'number', example: 123.456 },
        environment: { type: 'string', example: 'development' },
      },
    },
  })
  getHealth() {
    return this.appService.getHealth();
  }

  @Get()
  @ApiOperation({ summary: 'API root endpoint' })
  @ApiResponse({
    status: 200,
    description: 'API information',
  })
  getApiInfo() {
    return {
      message: 'Cursor Workshop API',
      version: '1.0.0',
      documentation: '/api/docs',
      endpoints: {
        health: '/api/health',
        docs: '/api/docs',
      },
    };
  }

  @Get('metrics/:id')
    async getMetrics(@Param('id') id: string) {
      return this.appService.calculateUserMetrics(id);
    }
}
