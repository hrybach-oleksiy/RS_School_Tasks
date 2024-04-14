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
      classNames: [styles['message-block']],
    });

    this.messageProps = messageProps;
    this.author = author;

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

    const messageFooter = div(['message-footer']);
    const messageStatus = messageData.status?.isDelivered ? 'delivered' : 'not delivered';
    const editedStatus = messageData.status?.isEdited ? 'edited' : '';
    const messageStatusElement = span(['message-status'], messageStatus);
    const editedStatusElement = span(['message-edited'], editedStatus);

    messageFooter.appendChildren([editedStatusElement, messageStatusElement]);

    this.appendChildren([messageHeader, messageBody, messageFooter]);
  }

  // public setMessageAuthor = (authorName: string) => {
  //   this.messageAuthor = authorName;
  // };
}
