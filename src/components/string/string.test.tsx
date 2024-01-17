
import { swapper } from './utils';

describe('swapper', () => {
  test('поменять местами элементы с заданными индексами', async () => {
    const arr = ['a', 'b', 'c'];
    const leftIndex = 0;
    const rightIndex = 2;

    const result = await swapper(arr, leftIndex, rightIndex);

    expect(result).toEqual(['c', 'b', 'a']);
  });

  test('должен возвращать тот же массив, если длина меньше или равна 1', async () => {
    const arr = ['a'];
    const leftIndex = 0;
    const rightIndex = 0;

    const result = await swapper(arr, leftIndex, rightIndex);

    expect(result).toEqual(['a']);
  });

  test('должен возвращать тот же массив, если индексы находятся за пределами допустимых значений', async () => {
    const arr = ['a', 'b', 'c'];
    const leftIndex = 3;
    const rightIndex = 4;

    const result = await swapper(arr, leftIndex, rightIndex);

    expect(result).toEqual(['a', 'b', 'c']);
  });
});