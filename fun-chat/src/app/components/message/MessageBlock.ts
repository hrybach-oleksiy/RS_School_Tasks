import BaseComponent from '../BaseComponent';
import { div, span, p } from '../HTMLComponents';

import { assertIsDefined, formatDate } from '../../../utilities/utils';

import { MessageData } from '../../../types/interfaces';

import styles from './MessageBlock.module.scss';

export default class MessageBlock extends BaseComponent {
  private messageProps: MessageData;

  private author: string;

  constructor(messageProps: MessageData, author: string) {
    super({
      tag: 'div',
      classNames: [styles['message-block'], 'message-block-js'],
    });

    this.messageProps = messageProps;
    this.author = author;

    assertIsDefined(this.messageProps.id);

    this.setAttribute(`data-message`, this.messageProps.id);
    this.setPage(this.messageProps);
  }

  private setPage(messageData: MessageData) {
    const messageHeader = div([styles['message-header']]);

    const authorName = span(['author-name'], this.author);

    assertIsDefined(messageData.datetime);
    const dateElement = span(['date'], formatDate(messageData.datetime));
    messageHeader.appendChildren([authorName, dateElement]);

    const messageBody = div([styles['message-body']]);
    const messageText = p(['text'], messageData.text);
    messageBody.append(messageText);

    const messageFooter = div([styles['message-footer']]);
    const deliveryStatus = messageData.status?.isDelivered ? 'delivered' : 'not delivered';
    const editStatus = messageData.status?.isEdited ? 'edited' : '';
    const readStatus = messageData.status?.isReaded ? 'read' : 'not read';
    const deliveryStatusElement = span(['message-status'], deliveryStatus);
    const editStatusElement = span(['message-edited'], editStatus);
    const readStatusElement = span(['message-read'], readStatus);

    messageFooter.appendChildren([editStatusElement, deliveryStatusElement, readStatusElement]);

    this.appendChildren([messageHeader, messageBody, messageFooter]);
  }
}
