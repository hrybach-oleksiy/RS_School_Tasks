// export function assertElementsDefined<T>(elements: (T | null)[]): asserts elements is NonNullable<T>[] {
//     elements.forEach((element) => {
//         if (element === undefined || element === null) {
//             throw new Error(`${element} is not defined`);
//         }
//     });
// }

// export const assertIsDefined = <T>(value: T | null | undefined): asserts value is NonNullable<T> => {
//     if (value === undefined || value === null) {
//         throw new Error(`${value} is not defined`);
//     }
// };

export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
    if (value === undefined || value === null) {
        throw new Error(`${value} is not defined`);
    }
}
