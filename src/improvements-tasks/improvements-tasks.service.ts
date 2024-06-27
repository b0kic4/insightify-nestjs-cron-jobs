import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ImprovementsTasksService {
  constructor(private readonly prisma: PrismaService) {}

  // Schedule the job to run at the top of every hour
  @Cron(CronExpression.EVERY_HOUR)
  async deleteOldImprovements() {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Find improvements older than 24 hours
    const improvements = await this.prisma.improvement.findMany({
      where: {
        createdAt: {
          lte: twentyFourHoursAgo, // lte means "less than or equal to"
        },
      },
    });

    // Delete each improvement found
    for (const improvement of improvements) {
      await this.prisma.improvement.delete({
        where: { id: improvement.id },
      });
      console.log(`Deleted improvement with ID: ${improvement.id}`);
    }
  }
}
