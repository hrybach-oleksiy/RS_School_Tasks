import BaseComponent from '../BaseComponent';
import { div, p, img, h2, span } from '../HTMLComponents';
import Hint from '../hint/Hint';
import GameSelect from '../game-select/GameSelect';
import { HintsState } from '../../../types/interfaces';
import { FormAttribute, ImageAttribute } from '../../../types/enums';

import audioIconImage from '../../../assets/images/audio-icon.svg';
import playingIconImage from '../../../assets/images/audio-playing.svg';

import styles from './GameHeader.module.scss';

export default class GameHeader extends BaseComponent {
    private translation: string;

    private hintsState: HintsState;

    private audioExample: string;

    private isPlaying: boolean = false;

    private audioIcon: BaseComponent = img([styles['audio-img']]);

    private onLevelChange: (event: Event) => void;

    private onRoundChange: (event: Event) => void;

    private currentLevel: number;

    private roundsCount: number;

    private currentRound: number;

    constructor(
        translation: string,
        hintsState: HintsState,
        audioExample: string,
        onLevelChange: (event: Event) => void,
        onRoundChange: (event: Event) => void,
        currentLevel: number,
        roundsCount: number,
        currentRound: number,
    ) {
        super({
            tag: 'div',
            classNames: [styles['game-header-wrapper']],
        });
        this.translation = translation;
        this.hintsState = hintsState;
        this.audioExample = audioExample;
        this.currentLevel = currentLevel;
        this.onLevelChange = onLevelChange;
        this.onRoundChange = onRoundChange;
        this.roundsCount = roundsCount;
        this.currentRound = currentRound;
        this.setBlock();
    }

    private setBlock() {
        this.destroyChildren();

        // TODO: Move blocks to the separate methods

        // translation block
        const paragraph = p([styles.translation], this.translation);
        paragraph.setAttribute(FormAttribute.ID, 'translation-text');

        if (this.hintsState.translation) {
            paragraph.removeClass('hidden');
        } else {
            paragraph.addClass('hidden');
        }

        // hints block
        const translationProps = {
            id: 'translation',
            name: 'translation',
            type: 'checkbox',
            onChange: this.handleHintChange,
        };
        const pronunciationProps = {
            id: 'pronunciation',
            name: 'pronunciation',
            type: 'checkbox',
            onChange: this.handleHintChange,
        };
        const translationHint = new Hint('Translation', this.hintsState.translation, translationProps);
        const pronunciationHint = new Hint('Pronunciation ', this.hintsState.pronunciation, pronunciationProps);
        const hintsWrapper = div([styles['hints-wrapper']]);
        hintsWrapper.appendChildren([translationHint, pronunciationHint]);

        // Game Levels Block
        const gameLevelsWrapper = div([styles['game-levels-wrapper']]);
        const levelSelect = new GameSelect('Level', 6, this.currentLevel);
        const roundSelect = new GameSelect('Round', this.roundsCount, this.currentRound);
        gameLevelsWrapper.appendChildren([levelSelect, roundSelect]);

        levelSelect.addListener('change', this.onLevelChange);
        roundSelect.addListener('change', this.onRoundChange);

        // Audio Icon Block
        const audioIconWrapper = div([styles['audio-icon-wrapper']]);
        this.audioIcon.setAttribute(ImageAttribute.SRC, audioIconImage);
        this.audioIcon.setAttribute(ImageAttribute.ALT, 'Audio Icon');
        this.audioIcon.setAttribute(FormAttribute.ID, 'audio-icon');
        this.audioIcon.addListener('click', () => {
            if (!this.isPlaying) {
                this.handleAudioIconClick(this.audioExample);
            }
        });

        if (this.hintsState.pronunciation) {
            this.audioIcon.removeClass('hidden');
        } else {
            this.audioIcon.addClass('hidden');
        }
        audioIconWrapper.append(this.audioIcon);

        // Game Levels Title Block
        const levelCountElement = span([styles.count], String(this.currentLevel));
        const roundCountElement = span([styles.count], String(this.currentRound));
        const levelElement = span([], 'Level: ');
        const roundElement = span([], ',    Round: ');
        const gameLevelsTitle = h2([styles['game-levels-title']], ``);
        const currentColorClass = GameHeader.setDifficultyColor(this.currentLevel);
        levelCountElement.addClass(`${styles[currentColorClass]}`);
        roundCountElement.addClass(`${styles[currentColorClass]}`);
        gameLevelsTitle.appendChildren([levelElement, levelCountElement, roundElement, roundCountElement]);

        // appending to the page
        this.appendChildren([gameLevelsWrapper, hintsWrapper, gameLevelsTitle, audioIconWrapper, paragraph]);

        // add class for smooth element appearance
        setTimeout(() => {
            document.querySelectorAll(`.${styles.count}`).forEach((element) => {
                element.classList.add(styles.show);
            });
        }, 0);
    }

    static setDifficultyColor(level: number) {
        switch (level) {
            case 1:
                return 'level-1';
            case 2:
                return 'level-2';
            case 3:
                return 'level-3';
            case 4:
                return 'level-4';
            case 5:
                return 'level-5';
            case 6:
                return 'level-6';
            default:
                return 'level-1';
        }
    }

    private handleHintChange = (event: Event) => {
        const currentHint = event.target as HTMLInputElement;
        const isHintChecked = currentHint.checked;
        const hintName = currentHint.name;
        const currentHintsState = GameHeader.getHintsState();

        let translationValue = currentHintsState?.translation;
        let pronunciationValue = currentHintsState?.pronunciation;

        if (isHintChecked) {
            this.setHintState(hintName, true);
        } else {
            this.setHintState(hintName, false);
        }

        if (hintName === 'translation') {
            translationValue = isHintChecked;
        }

        if (hintName === 'pronunciation') {
            pronunciationValue = isHintChecked;
        }

        const hintsState = { translation: translationValue, pronunciation: pronunciationValue };
        const hintsStateJSON = JSON.stringify(hintsState);

        localStorage.setItem('hintsState', hintsStateJSON);
    };

    private setHintState(hintName: keyof HintsState, value: boolean) {
        this.hintsState[hintName] = value;
        this.setBlock();
    }

    private handleAudioIconClick = (example: string) => {
        const audio = new Audio();

        if (!this.isPlaying) {
            this.audioIcon.setAttribute(ImageAttribute.SRC, playingIconImage);
            audio.src = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${example}`;
            audio.play();
            this.isPlaying = true;
            audio.onended = () => {
                this.isPlaying = false;
                this.audioIcon.setAttribute(ImageAttribute.SRC, audioIconImage);
            };
        }
    };

    static getHintsState() {
        const hintsStateJSON = localStorage.getItem('hintsState');

        if (hintsStateJSON) {
            const hintsState = JSON.parse(hintsStateJSON);

            return {
                translation: hintsState.translation,
                pronunciation: hintsState.pronunciation,
            };
        }

        return null;
    }
}
