import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImprovementsTasksModule } from './improvements-tasks/improvements-tasks.module';
import { PrismaService } from './prisma.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), ImprovementsTasksModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
