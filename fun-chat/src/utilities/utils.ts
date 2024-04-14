function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`${value} is not defined`);
  }
}

function isFirstLetterUppercase(value: string) {
  return /^[A-Z]/.test(value);
}

function formatDate(milliseconds: number): string {
  const date = new Date(milliseconds);
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);
  return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
}

export { assertIsDefined, isFirstLetterUppercase, formatDate };
