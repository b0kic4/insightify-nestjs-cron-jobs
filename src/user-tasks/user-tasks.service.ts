import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserTasksService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async resetFreeImprovement() {
    const sixHoursAgo = new Date();
    sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);

    const usersToUpdate = await this.prisma.user.findMany({
      where: {
        free_improvement_lastTime_used: {
          lte: sixHoursAgo,
        },
      },
    });

    if (usersToUpdate.length > 0) {
      const userIds = usersToUpdate.map((user) => user.id);

      await this.prisma.user.updateMany({
        where: {
          id: {
            in: userIds,
          },
        },
        data: {
          daily_free_improvements: 2,
        },
      });

      console.log(
        `Reset daily_free_improvements for ${usersToUpdate.length} users`,
      );
    } else {
      console.log('No users to update');
    }
  }
}
