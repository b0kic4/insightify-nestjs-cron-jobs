import { Module } from '@nestjs/common';
import { PlanTasksService } from './plan-tasks.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PlanTasksService, PrismaService],
})
export class PlanTasksModule {}
