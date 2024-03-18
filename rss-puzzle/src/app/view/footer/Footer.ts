import BaseComponent from '../../components/BaseComponent';
import { div, img, span, a } from '../../components/HTMLComponents';
import { LinkAttribute, ImageAttribute } from '../../../types/enums';

import courseLogo from '../../../assets/images/school-logo.svg';
import gitHubLogo from '../../../assets/images/github-logo.svg';

import styles from './footer.module.scss';

// <div class="copyright">
//   <a href="https://github.com/hrybach-oleksiy"
//    target="_blank">
//   <img src="./assets/github-logo.svg"
//        alt="GitHub Logo">
//   </a>
//  <div class="course-link">
//   <a href="https://rs.school/js/"
//      target="_blank">
//     <img src="./assets/school-logo.svg"
//          alt="RS School Logo">
//   </a>
//  </div>
//  <span> &copy;2024, by Hrybach Oleksiy</span>
// </div>

export default class Footer extends BaseComponent {
    onButtonClick: () => void;

    constructor(onButtonClick: () => void) {
        super({
            tag: 'footer',
            classNames: [styles.footer],
        });

        this.onButtonClick = onButtonClick;
        this.addListener('click', () => {
            this.onButtonClick();
        });

        this.setBlock();
    }

    private setBlock() {
        const copyrightElement = div([styles.copyright]);
        const gitHubLink = a([styles.link]);
        const courseLink = a([styles.link]);
        const copy = span(['copy'], '© 2024, by Hrybach Oleksiy');
        const gitHubLogoElement = img([styles.img]);
        const courseLogoElement = img([styles.img]);

        gitHubLink.setAttribute(LinkAttribute.HREF, 'https://github.com/hrybach-oleksiy');
        gitHubLink.setAttribute(LinkAttribute.TARGET, '_blank');
        courseLink.setAttribute(LinkAttribute.HREF, 'https://rs.school/js/');
        courseLink.setAttribute(LinkAttribute.TARGET, '_blank');
        gitHubLogoElement.setAttribute(ImageAttribute.SRC, gitHubLogo);
        gitHubLogoElement.setAttribute(ImageAttribute.ALT, 'GitHub Logo');
        courseLogoElement.setAttribute(ImageAttribute.SRC, courseLogo);
        courseLogoElement.setAttribute(ImageAttribute.ALT, 'RS School Logo');

        gitHubLink.append(gitHubLogoElement);
        courseLink.append(courseLogoElement);

        copyrightElement.appendChildren([gitHubLink, courseLink, copy]);

        this.append(copyrightElement);
    }
}
