import { Module } from '@nestjs/common';
import { UserTasksService } from './user-tasks.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UserTasksService, PrismaService],
})
export class UserTasksModule {}
