import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('sse')
  sendEvents(@Query('userId') userId: string, @Res() res: Response) {
    if (!userId) {
      console.log('no userId: ', userId);
      return;
    }
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // Flush the headers to establish SSE connection

    const keepAliveInterval = setInterval(() => {
      res.write(`data: ${JSON.stringify({ message: 'keep-alive' })}\n\n`);
    }, 30000); // Keep connection alive every 30 seconds

    const subscriber = (event: any) => {
      console.log('Sending event to client:', event);
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    };

    this.notificationsService.subscribe(userId, subscriber);

    res.on('close', () => {
      clearInterval(keepAliveInterval);
      this.notificationsService.unsubscribe(userId, subscriber);
      res.end();
    });
  }
}
