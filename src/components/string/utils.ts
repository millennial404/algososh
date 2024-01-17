export const swapper = async (arr: string[], leftIndex: number, rightIndex: number) => {
  if (arr.length <= 1) {
    return arr;
  }
  if (leftIndex < 0 || leftIndex >= arr.length || rightIndex < 0 || rightIndex >= arr.length) {
    return arr;
  }
  const newArr = [...arr];
  const leftChar = newArr[leftIndex];
  newArr[leftIndex] = newArr[rightIndex];
  newArr[rightIndex] = leftChar;
  return newArr;
}