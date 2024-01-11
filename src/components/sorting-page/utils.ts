export const randomArray = (length: number, min: number, max: number) => {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * (max - min) + min));
  }
  return array;
}

export const randomLength = () => {
  return Math.floor(Math.random() * 15) + 3;
}

export const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};