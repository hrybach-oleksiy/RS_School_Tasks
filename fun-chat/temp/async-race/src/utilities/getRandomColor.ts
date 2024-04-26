const getRandomColor = () => {
  const COLOR_STRING_LENGTH = 6;
  const colorSymbols = '0123456789ABCDEF';
  let randomColor = '#';

  for (let i = 0; i < COLOR_STRING_LENGTH; i += 1) {
    const randomIndex = Math.floor(Math.random() * colorSymbols.length);

    randomColor += colorSymbols.charAt(randomIndex);
  }

  return randomColor;
};

export default getRandomColor;
