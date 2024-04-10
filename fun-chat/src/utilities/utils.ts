function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`${value} is not defined`);
  }
}

function isFirstLetterUppercase(value: string) {
  return /^[A-Z]/.test(value);
}

export { assertIsDefined, isFirstLetterUppercase };
