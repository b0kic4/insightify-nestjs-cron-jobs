import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

type Subscriber = (event: any) => void;

@Injectable()
export class NotificationsService {
  private subscribers: { [key: string]: Subscriber[] } = {};

  subscribe(userId: string, subscriber: Subscriber) {
    if (!this.subscribers[userId]) {
      this.subscribers[userId] = [];
    }
    this.subscribers[userId].push(subscriber);
  }

  notifySubscribers(userId: string, event: any) {
    if (this.subscribers[userId]) {
      this.subscribers[userId].forEach((subscriber) => subscriber(event));
    }
  }

  @EventPattern('improvement.deleted')
  async handleImprovementDeleted(data: any) {
    console.log(`Received message for user ${data.userId}: ${data.message}`);
    this.notifySubscribers(data.userId, data);
  }

  @EventPattern('plan.expired')
  async handlePlanExpired(data: any) {
    console.log(`Received message for user ${data.userId}: ${data.message}`);
    this.notifySubscribers(data.userId, data);
  }
}
