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

export const selectionSortSteps = (arr: number[], sortingVariant: string = 'ascending'): {
  arr: number[],
  steps: number[][]
} => {
  if (arr === undefined || arr.length < 2) {
    return {arr: arr, steps: []};
  }
  const steps = [];
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      const shouldSwap =
        sortingVariant === "ascending" ? arr[j] < arr[minIndex] : arr[j] > arr[minIndex];
      if (shouldSwap) {
        minIndex = j;
      }
    }

    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
    steps.push([...arr]);
  }
  console.log({arr: arr, steps: steps})
  return {arr: arr, steps: steps};
}
