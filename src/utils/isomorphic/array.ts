export const repeat = (
  callback: (i: number, max: number) => any,
  max: number
) => {
  const arr: any[] = [];
  for (let i = 0; i < max; i++) {
    const returnValue = callback(i, max);
    if (returnValue) {
      arr.push(returnValue);
    }
  }
  return arr;
};
