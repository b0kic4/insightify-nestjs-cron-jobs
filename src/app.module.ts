import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImprovementsTasksModule } from './improvements-tasks/improvements-tasks.module';
import { PrismaService } from './prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PlanTasksModule } from './plan-tasks/plan-tasks.module';
import { RabbitMQConfigModule } from './rabbit-mq/rabbit-mq.module';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ImprovementsTasksModule,
    PlanTasksModule,
    RabbitMQConfigModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, NotificationsService],
})
export class AppModule {}
