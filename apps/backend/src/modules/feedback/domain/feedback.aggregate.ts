import { AggregateBase } from '#/be/lib/ddd/aggregate.base';
import { FeedbackCreatedEvent } from './events/feedback-created.event';
import { Feedback } from './feedback.entity';

export class FeedbackAggregate extends AggregateBase {
  private static _feedback: Feedback;

  static entity(feedback: Feedback) {
    this._feedback = feedback;

    return this;
  }

  static created() {
    this.addDomainEvent(
      new FeedbackCreatedEvent({
        feedbackId: this._feedback.id,
      }),
    );
  }

  static updated() {
    this.addDomainEvent(
      new FeedbackCreatedEvent({
        feedbackId: this._feedback.id,
      }),
    );
  }

  static deleted() {
    this.addDomainEvent(
      new FeedbackCreatedEvent({
        feedbackId: this._feedback.id,
      }),
    );
  }
}
