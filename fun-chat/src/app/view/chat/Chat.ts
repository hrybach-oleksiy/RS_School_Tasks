import BaseComponent from '../../components/BaseComponent';
// import { div, img, span, a } from '../../components/HTMLComponents';

// import { LinkAttribute, ImageAttribute } from '../../../types/enums';

// import courseLogo from '../../../assets/images/school-logo.svg';
// import gitHubLogo from '../../../assets/images/github-logo.svg';

// import styles from './Footer.module.scss';

import Router from '../../router/Router';

export default class Chat extends BaseComponent {
  private router: Router;

  constructor(router: Router) {
    super({
      tag: 'div',
      classNames: ['chat'],
      text: 'Chat',
    });

    this.router = router;
  }
}
