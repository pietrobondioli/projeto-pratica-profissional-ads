import { AggregateBase } from '#/be/lib/ddd/aggregate.base';
import { FeedbackCreatedEvent } from './events/feedback-created.event';
import { FeedbackDeletedEvent } from './events/feedback-deleted.event';
import { FeedbackUpdatedEvent } from './events/feedback-updated.event';

export class FeedbackAggregate extends AggregateBase {
  private static _feedbackId: string;

  static entityID(feedbackId: string) {
    this._feedbackId = feedbackId;

    return this;
  }

  static created() {
    this.addDomainEvent(
      new FeedbackCreatedEvent({
        feedbackId: this._feedbackId,
      }),
    );
  }

  static updated() {
    this.addDomainEvent(
      new FeedbackUpdatedEvent({
        feedbackId: this._feedbackId,
      }),
    );
  }

  static deleted() {
    this.addDomainEvent(
      new FeedbackDeletedEvent({
        feedbackId: this._feedbackId,
      }),
    );
  }
}
