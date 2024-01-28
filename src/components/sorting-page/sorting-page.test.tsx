import {randomArray, randomLength, selectionSortSteps, swap} from './utils';

describe('SortingPage', () => {

test('randomArray возвращает массив заданной длины', () => {
  const result = randomArray(5, 1, 10);
  expect(result).toHaveLength(5);
});

test('randomArray возвращает массив с числами в пределах указанного диапазона', () => {
  const result = randomArray(10, 5, 20);
  result.forEach(num => {
    expect(num).toBeGreaterThanOrEqual(5);
    expect(num).toBeLessThanOrEqual(20);
  });
});

  test('randomLength возвращает число от 3 до 17', () => {
    const result = randomLength();
    expect(result).toBeGreaterThanOrEqual(3);
    expect(result).toBeLessThanOrEqual(17);
  });

  test('swap swap корректно меняет местами элементы в массиве', () => {
    const arr = [1, 2, 3, 4];
    swap(arr, 0, 2);
    expect(arr).toEqual([3, 2, 1, 4]);
  });

  test('swap не должен изменять массив, если указан тот же индекс', () => {
    const arr = [1, 2, 3, 4];
    swap(arr, 1, 1);
    expect(arr).toEqual([1, 2, 3, 4]);
  });

  test('сортировка выбором в порядке возрастания', () => {
    const inputArr = [3, 1, 5, 2, 4];
    const expectedSteps = [
      [1, 3, 5, 2, 4],
      [1, 2, 5, 3, 4],
      [1, 2, 3, 5, 4],
      [1, 2, 3, 4, 5]
    ];
    expect(selectionSortSteps(inputArr, 'ascending').steps).toEqual(expectedSteps);
  });

  test('сортировка выбором в порядке убывания', () => {
    const inputArr = [3, 1, 5, 2, 4];
    const expectedSteps = [
      [5, 1, 3, 2, 4],
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1]
    ];
    expect(selectionSortSteps(inputArr, 'descending').steps).toEqual(expectedSteps);
    expect(selectionSortSteps(inputArr).arr).toEqual([1, 2, 3, 4, 5]);
  });

  test('сортировка пустого массива' , () => {
    const inputArr: number[] = [];
    const expectedSteps: number[][] = [];
    const result = selectionSortSteps(inputArr);
    expect(result.steps).toEqual(expectedSteps);
    expect(result.arr).toEqual([]);
  })

  test('сортировка одного элемента' , () => {
    const inputArr: number[] = [1];
    const expectedSteps: number[][] = [];
    const result = selectionSortSteps(inputArr);
    expect(result.steps).toEqual(expectedSteps);
    expect(result.arr).toEqual([1]);
  })

  test('сортировка нескольких элементов' , () => {
    const inputArr = [1, 2];
    const expectedSteps = [
      [1, 2]
    ];
    expect(selectionSortSteps(inputArr).steps).toEqual(expectedSteps);
    expect(selectionSortSteps(inputArr).arr).toEqual([1, 2]);
  })

})