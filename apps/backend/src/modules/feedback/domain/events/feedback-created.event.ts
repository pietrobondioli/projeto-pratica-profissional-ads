import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

type Payload = {
  readonly feedbackId: string;
};

export class FeedbackCreatedEvent extends DomainEventBase<Payload> {}
