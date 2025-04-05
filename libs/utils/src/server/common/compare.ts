/**
 * NOTE: Compare two arrays of objects to see if they have the same order and if the selected key's value is the same.
 * @param source array
 * @param target array
 * @param key keyof T & string
 * @returns boolean
 */
export const objectArraysEqualWithOrder = <T>(source: T[], target: T[], key: keyof T & string): boolean => {
  if (source.length !== target.length) return false;

  return source.every((obj1, index) => {
    const obj2 = target[index];

    if (typeof obj1[key] === "string" && typeof obj2[key] === "string") {
      return (obj1[key] as string).toLowerCase() === (obj2[key] as string).toLowerCase();
    }

    return obj1[key] === obj2[key];
  });
};
