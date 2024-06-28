import { Module } from '@nestjs/common';
import { ImprovementsTasksService } from './improvements-tasks.service';
import { PrismaService } from 'src/prisma.service';
import { RabbitMQConfigModule } from '../rabbit-mq/rabbit-mq.module';

@Module({
  imports: [RabbitMQConfigModule],
  providers: [ImprovementsTasksService, PrismaService],
})
export class ImprovementsTasksModule {}
