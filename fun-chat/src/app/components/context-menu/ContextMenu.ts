import BaseComponent from '../BaseComponent';
import { ul, li } from '../HTMLComponents';

import styles from './ContextMenu.module.scss';

export default class ContextMenu extends BaseComponent {
  private onDelete: () => void;

  private onEdit: () => void;

  constructor(onDelete: () => void, onEdit: () => void) {
    super({
      tag: 'div',
      classNames: [styles['context-menu'], 'context-menu-js'],
    });

    document.addEventListener('click', (event) => {
      if (!this.getNode().contains(event.target as HTMLElement)) {
        this.remove();
      }
    });

    // document.addEventListener('contextmenu', (event) => {
    //   const allMenus = document.querySelectorAll(`.${styles['context-menu']}`);
    //   console.log(allMenus);
    //   allMenus.forEach((menu) => {
    //     if (menu !== event.target) {
    //       menu.remove();
    //     }
    //   });
    // });

    this.setBlock();
    this.onDelete = onDelete;
    this.onEdit = onEdit;
  }

  private setBlock() {
    const menuListElement = ul([styles['menu-list']]);
    const deleteElement = li([styles['menu-item']], 'Delete');
    const editElement = li([styles['menu-item']], 'Edit');

    deleteElement.addListener('click', () => {
      this.onDelete();
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
