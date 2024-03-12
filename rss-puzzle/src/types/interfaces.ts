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

export interface Level {
    levelData: {
        id: string;
        name: string;
        imageSrc: string;
        cutSrc: string;
        author: string;
        year: string;
    };
    words: WordsData[];
}

export interface GameData {
    rounds: Level[];
    roundsCount: number;
}
