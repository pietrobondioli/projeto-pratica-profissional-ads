import { AggregateBase } from '#/be/lib/ddd/aggregate.base';
import { FeedbackCreatedEvent } from './events/feedback-created.event';
import { FeedbackDeletedEvent } from './events/feedback-deleted.event';
import { FeedbackUpdatedEvent } from './events/feedback-updated.event';
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
      new FeedbackUpdatedEvent({
        feedbackId: this._feedback.id,
      }),
    );
  }

  static deleted() {
    this.addDomainEvent(
      new FeedbackDeletedEvent({
        feedbackId: this._feedback.id,
      }),
    );
  }
}
