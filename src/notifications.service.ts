import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class NotificationsService {
  @EventPattern('improvement.deleted')
  async handleImprovementDeleted(data: any) {
    console.log(`Received message for user ${data.userId}: ${data.message}`);
  }

  @EventPattern('plan.expired')
  async handlePlanExpired(data: any) {
    console.log(`Received message for user ${data.userId}: ${data.message}`);
  }
}
