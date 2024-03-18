// export interface AppData {
//     statistic?: string[];
// }

export interface UserData {
    name: string;
    surname: string;
}

export interface WordsData {
    id: number;
    textExample: string;
    audioExample: string;
    textExampleTranslate: string;
    word: string;
    wordTranslate: string;
}

export interface LevelData {
    id?: string;
    name: string;
    imageSrc?: string;
    cutSrc: string;
    author: string;
    year: string;
}

export interface Level {
    levelData: LevelData;
    words: WordsData[];
}

export interface GameData {
    rounds: Level[];
    roundsCount: number;
}

export interface AppState {
    currentPage: string;
}

export interface InputProps {
    classNames?: string[];
    id: string;
    type?: string;
    name: string;
    placeholder?: string;
    required?: string;
    checked?: string;
    onChange?: EventListener;
}

export interface HintsState {
    [key: string]: boolean;
}
