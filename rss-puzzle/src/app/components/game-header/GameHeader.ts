import BaseComponent from '../BaseComponent';
import { div, p, img } from '../HTMLComponents';
import Hint from '../hint/Hint';
import { HintsState } from '../../../types/interfaces';
import { FormAttribute, ImageAttribute } from '../../../types/enums';

import audioIconImage from '../../../assets/images/audio-icon.svg';

import styles from './GameHeader.module.scss';

export default class GameHeader extends BaseComponent {
    private translation: string;

    private hintsState: HintsState;

    private audioExample: string;

    private isPlaying: boolean = false;

    constructor(translation: string, hintsState: HintsState, audioExample: string) {
        super({
            tag: 'div',
            classNames: [styles['game-header-wrapper']],
        });
        this.translation = translation;
        this.hintsState = hintsState;
        this.audioExample = audioExample;
        this.setBlock();
    }

    private setBlock() {
        this.destroyChildren();

        const paragraph = p([styles.translation], this.translation);
        const translationProps = {
            id: 'translation',
            name: 'translation',
            type: 'checkbox',
            onChange: this.handleHintChange,
        };
        const hint = new Hint('Translation', this.hintsState.translation, translationProps);
        const audioIconWrapper = div([styles['audio-icon-wrapper']]);
        const audioIcon = img([styles['audio-img']]);

        if (this.hintsState.translation) {
            paragraph.removeClass('hidden');
        } else {
            paragraph.addClass('hidden');
        }

        paragraph.setAttribute(FormAttribute.ID, 'translation-text');
        audioIcon.setAttribute(ImageAttribute.SRC, audioIconImage);
        audioIcon.setAttribute(ImageAttribute.ALT, 'Audio Icon');
        audioIcon.addListener('click', () => {
            if (!this.isPlaying) {
                this.handleAudioIconClick(this.audioExample);
            }
        });

        audioIconWrapper.append(audioIcon);
        this.appendChildren([hint, audioIconWrapper, paragraph]);
    }

    private handleHintChange = (event: Event) => {
        const currentHint = event.target as HTMLInputElement;
        const isHintChecked = currentHint.checked;
        const hintName = currentHint.name;

        if (isHintChecked) {
            this.setHintState(hintName, true);
        } else {
            this.setHintState(hintName, false);
        }
    };

    private setHintState(hintName: keyof HintsState, value: boolean) {
        this.hintsState[hintName] = value;
        this.setBlock();
    }

    private handleAudioIconClick = (example: string) => {
        const audio = new Audio();
        console.log('click works');

        if (!this.isPlaying) {
            console.log('audio playing');
            audio.src = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${example}`;
            audio.play();
            this.isPlaying = true;
            audio.onended = () => {
                this.isPlaying = false;
            };
        }
    };
}
