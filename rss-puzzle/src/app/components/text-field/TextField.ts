// import BaseComponent from '../BaseComponent';
// import { label, input } from '../HTMLComponents';
// import FormAttribute from '../../../types/enums';

// export default class TextField extends BaseComponent {
//     constructor(labelText: string, name: string, styles: string) {
//         // const formLabel = new BaseComponent({ tag: 'label', classNames: [styles.label], text: labelText });
//         // const formInput = new BaseComponent({ tag: 'input', classNames: [styles.input, 'input'] });
//         const formLabel = label([styles], labelText);
//         const formInput = input([styles]);

//         input.setAttribute(FormAttribute.TYPE, 'text');
//         input.setAttribute(FormAttribute.NAME, name);
//         input.setAttribute(FormAttribute.PLACEHOLDER, labelText);

//         super({ tag: 'div', classNames: [styles['text-field']] }, formLabel, formInput);
//     }
// }
