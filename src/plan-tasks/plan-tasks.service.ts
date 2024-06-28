import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';
import { RabbitMQPublisherService } from 'src/rabbit-mq/rabbit-mq.service';

@Injectable()
export class PlanTasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbitMQPublisherService: RabbitMQPublisherService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async lookForPlanCancelation() {
    const now = new Date();

    try {
      const canceledPlans = await this.prisma.plan.findMany({
        where: {
          canceledAt: {
            not: null,
          },
        },
      });

      for (const plan of canceledPlans) {
        if (plan.renewsAt && plan.renewsAt <= now) {
          await this.prisma.plan.update({
            where: { id: plan.id },
            data: {
              isActive: false,
              renewsAt: null,
            },
          });
          console.log(
            `Updated plan with ID: ${plan.id} to set isActive to false and renewsAt to null`,
          );
          await this.rabbitMQPublisherService.publishNotification(
            'plan.expired',
            {
              userId: plan.userId,
              message: `Your plan with ID ${plan.id} has expired.`,
            },
          );
        }
      }
    } catch (error) {
      console.error('Error processing plan cancellations:', error);
    }
  }
}
