import { assertIsDefined } from '../../../utilities/utils';
import BaseComponent from '../BaseComponent';
import { ul, li } from '../HTMLComponents';

import styles from './ContextMenu.module.scss';

export default class ContextMenu extends BaseComponent {
  private onDelete: (id: string) => void;

  private onEdit: () => void;

  constructor(onDelete: (id: string) => void, onEdit: () => void) {
    super({
      tag: 'div',
      classNames: [styles['context-menu'], 'context-menu-js'],
    });

    document.addEventListener('click', (event) => {
      if (!this.getNode().contains(event.target as HTMLElement)) {
        this.remove();
      }
    });

    this.setBlock();
    this.onDelete = onDelete;
    this.onEdit = onEdit;
  }

  private setBlock() {
    const menuListElement = ul([styles['menu-list']]);
    const deleteElement = li([styles['menu-item']], 'Delete');
    const editElement = li([styles['menu-item']], 'Edit');

    deleteElement.addListener('click', (event: Event) => {
      const currentMessage = (event.target as HTMLElement).closest('.message-block-js') as HTMLElement;
      const currentID = currentMessage.dataset.message;

      assertIsDefined(currentID);
      this.onDelete(currentID);
      this.remove();
    });

    editElement.addListener('click', () => {
      this.onEdit();
      this.remove();
    });

    menuListElement.appendChildren([deleteElement, editElement]);
    this.append(menuListElement);
  }

  public remove = () => {
    this.destroy();
  };

  public show = (parent: BaseComponent) => {
    parent.append(this);
  };
}
