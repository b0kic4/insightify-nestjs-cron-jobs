import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('sse')
  sendEvents(@Query('userId') userId: string, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // Flush the headers to establish SSE connection

    this.notificationsService.subscribe(userId, (event) => {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    });
  }
}
