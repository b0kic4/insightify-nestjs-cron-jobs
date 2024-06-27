import { Module } from '@nestjs/common';
import { ImprovementsTasksService } from './improvements-tasks.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  providers: [ImprovementsTasksService, PrismaService],
})
export class ImprovementsTasksModule {}
