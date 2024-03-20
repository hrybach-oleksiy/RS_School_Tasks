import BaseComponent from '../BaseComponent';
import { span, div } from '../HTMLComponents';

import { FormAttribute } from '../../../types/enums';

interface ImageChunk {
    startX: number;
    startY: number;
    width: number;
    height: number;
}
export default class SourceDataBlock extends BaseComponent {
    private words: string[];

    private imageWidth: number = 0;

    private imageHeights: number = 0;

    private imageSrc: string;

    constructor(words: string[], imageSrc: string) {
        super({
            tag: 'div',
            classNames: ['source-data'],
        });

        this.setAttribute(FormAttribute.ID, 'source');
        this.words = words;
        this.imageSrc = imageSrc;
        this.getImageSize();
    }

    // private createParts() {
    //     const imageChunks = SourceDataBlock.splitImageIntoChunks(
    //         this.imageWidth,
    //         this.imageHeights,
    //         10,
    //         this.words.length,
    //     );
    //     return this.words.map((word, index) => {
    //         const part = span(['part'], word);
    //         const chunkIndex = index % imageChunks.length;
    //         const { startX, startY } = imageChunks[chunkIndex];
    //         part.setAttribute(FormAttribute.ID, `part-${String(index + 1)}`);
    //         part.getNode().style.backgroundImage = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${this.imageSrc}`;
    //         part.getNode().style.backgroundPosition = `-${startX}px -${startY}px`;
    //         part.getNode().style.backgroundSize = `${this.imageWidth}px ${this.imageHeights}px`;
    //         return part;
    //     });
    // }

    private createParts() {
        // const imageChunks = SourceDataBlock.splitImageIntoChunks(
        //     this.imageWidth,
        //     this.imageHeights,
        //     10,
        //     this.words.length,
        // );
        return this.words.map((word, index) => {
            const part = span(['part'], word);
            // const chunkIndex = index % imageChunks.length;
            // const { startX, startY, width, height } = imageChunks[chunkIndex];
            part.setAttribute(FormAttribute.ID, `part-${String(index + 1)}`);

            // const imageUrl = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${this.imageSrc}`;

            // part.getNode().style.backgroundImage = `url('${imageUrl}')`;
            // part.getNode().style.backgroundPosition = `-${startX}px -${startY}px`;
            // part.getNode().style.backgroundSize = `${width}px ${height}px`;

            return part;
        });
    }

    private addTemplates() {
        const parts = this.createParts();

        for (let i = 0; i < this.words.length; i += 1) {
            const template = div(['source-template']);
            template.setAttribute(FormAttribute.ID, `template-${String(i + 1)}`);
            template.append(parts[i]);
            this.append(template);
        }
    }

    static splitImageIntoChunks(imageWidth: number, imageHeight: number, rows: number, cols: number): ImageChunk[] {
        console.log(imageWidth);
        console.log(imageHeight);
        console.log(rows);
        console.log(cols);
        const chunks: ImageChunk[] = [];
        const chunkWidth = Math.floor(imageWidth / cols);
        const chunkHeight = Math.floor(imageHeight / rows);

        for (let y = 0; y < rows; y += 1) {
            for (let x = 0; x < cols; x += 1) {
                const startX = x * chunkWidth;
                const startY = y * chunkHeight;
                const width = x === cols - 1 ? imageWidth - startX : chunkWidth;
                const height = y === rows - 1 ? imageHeight - startY : chunkHeight;
                chunks.push({ startX, startY, width, height });
            }
        }

        return chunks;
    }

    static loadImageAndGetSize(imageUrl: string): Promise<{ width: number; height: number }> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };
            img.onerror = (error) => {
                reject(error);
            };
            img.src = imageUrl;
        });
    }

    private getImageSize() {
        const imageUrl = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${this.imageSrc}`;

        SourceDataBlock.loadImageAndGetSize(imageUrl)
            .then(({ width, height }) => {
                this.imageWidth = width;
                this.imageHeights = height;
                this.addTemplates();
            })
            .catch((error: Error) => {
                console.error('Image Loading Error', error);
            });
    }
}
