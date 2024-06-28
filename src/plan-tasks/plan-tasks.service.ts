import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlanTasksService {
  constructor(private readonly prisma: PrismaService) {}

  // Schedule the job to run at the top of every hour
  @Cron(CronExpression.EVERY_HOUR)
  async lookForPlanCancelation() {
    const now = new Date();

    try {
      // Find all plans that are canceled (canceledAt is not null)
      const canceledPlans = await this.prisma.plan.findMany({
        where: {
          canceledAt: {
            not: null,
          },
        },
      });

      for (const plan of canceledPlans) {
        console.log('plan: ', plan);
        // Check if renewsAt is greater than or equal to the current DateTime
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
        }
      }
    } catch (error) {
      console.error('Error processing plan cancellations:', error);
    }
  }
}
