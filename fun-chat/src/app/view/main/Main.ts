import BaseComponent from '../../components/BaseComponent';

import styles from './Main.module.scss';

export default class Main extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      classNames: [styles.main, 'container'],
    });
  }
}
