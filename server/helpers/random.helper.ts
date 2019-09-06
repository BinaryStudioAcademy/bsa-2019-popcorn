export const getRandomNumber = (min: number, max: number): number => {
  return Math.round(min + Math.random() * (max - min));
};

export const getUniqRandomNumber = (
  min: number,
  max: number,
  amount: number
): number[] => {
  if (max - min < amount) {
    throw Error("Not enough numbers");
  }
  const set = new Set<number>();
  while (set.size < amount) {
    set.add(getRandomNumber(min, max));
  }
  return [...set];
};

export const getRandomFromArray = (arr: any[], amount) => {
  if (arr.length < amount) {
    return arr;
  }

  const randomNumbers: number[] = getUniqRandomNumber(
    0,
    arr.length - 1,
    amount
  );

  return randomNumbers.map(randomIndex => arr[randomIndex]);
};
