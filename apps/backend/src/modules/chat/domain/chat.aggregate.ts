import { AggregateBase } from '#/be/lib/ddd/aggregate.base';
import { ChatMessage } from './chat-message.entity';
import { Chat } from './chat.entity';
import { ChatCreatedEvent } from './events/chat-created.event';
import { MessageSentEvent } from './events/message-sent.event';

export class ChatAggregate extends AggregateBase {
  private static _chat: Chat;

  static chat(chat: Chat) {
    this._chat = chat;

    return this;
  }

  static created() {
    this.addDomainEvent(
      new ChatCreatedEvent({
        chat: this._chat,
      }),
    );
  }

  static messageSent(message: ChatMessage) {
    this.addDomainEvent(
      new MessageSentEvent({
        chat: this._chat,
        message,
      }),
    );
  }
}
