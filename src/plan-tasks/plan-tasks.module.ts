import { Module } from '@nestjs/common';
import { PlanTasksService } from './plan-tasks.service';
import { PrismaService } from 'src/prisma.service';
import { RabbitMQPublisherService } from 'src/rabbit-mq/rabbit-mq.service';
import { RabbitMQConfigModule } from 'src/rabbit-mq/rabbit-mq.module';

@Module({
  imports: [RabbitMQConfigModule],
  providers: [PlanTasksService, PrismaService, RabbitMQPublisherService],
})
export class PlanTasksModule {}
