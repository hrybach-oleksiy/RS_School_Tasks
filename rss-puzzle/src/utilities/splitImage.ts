// TypeScript
interface ImageChunk {
    startX: number;
    startY: number;
    width: number;
    height: number;
}

function splitImageIntoChunks(imageWidth: number, imageHeight: number, rows: number, cols: number): ImageChunk[] {
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

// const sentence = 'Ваше предложение разбито на слова';
// const words = sentence.split(' ');

// Получаем контейнер, в который будут добавлены слова с изображениями в качестве фонов
// const container = document.getElementById('sentence-container');

// Разбиваем изображение на фрагменты
const imageWidth = 800; // Ширина изображения
const imageHeight = 600; // Высота изображения
const rows = 3; // Количество строк
const cols = 3; // Количество столбцов
const imageChunks = splitImageIntoChunks(imageWidth, imageHeight, rows, cols);
console.log(imageChunks);

// Присваиваем каждому слову изображение в качестве фона
// words.forEach((word, index) => {
//     // Создаем элемент для слова
//     const wordElement = document.createElement('div');
//     wordElement.textContent = word;
//     wordElement.classList.add('word');

//     // Выбираем соответствующий фрагмент изображения для текущего слова
//     const chunkIndex = index % imageChunks.length;
//     const { startX, startY, width, height } = imageChunks[chunkIndex];

//     // Применяем фоновое изображение
//     wordElement.style.backgroundImage = `url('path/to/image.jpg')`;
//     wordElement.style.backgroundPosition = `-${startX}px -${startY}px`;
//     wordElement.style.backgroundSize = `${imageWidth}px ${imageHeight}px`;

//     // Добавляем слово в контейнер
//     container.appendChild(wordElement);
// });
