import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';
import { RabbitMQPublisherService } from 'src/rabbit-mq/rabbit-mq.service';

@Injectable()
export class ImprovementsTasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbitMQPublisherService: RabbitMQPublisherService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async deleteOldImprovements() {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const improvements = await this.prisma.improvement.findMany({
      where: {
        createdAt: {
          lte: yesterday,
        },
      },
    });

    for (const improvement of improvements) {
      await this.prisma.improvement.delete({
        where: { id: improvement.id },
      });
      console.log(`Deleted improvement with ID: ${improvement.id}`);
      await this.rabbitMQPublisherService.publishNotification(
        'improvement.deleted',
        {
          userId: improvement.userId,
          message: `Improvement with ID ${improvement.id} was deleted.`,
        },
      );
    }
  }
}
