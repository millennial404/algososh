
import { reverseString } from './utils';

describe('reverseString', () => {
  test('Корректно разворачивает пустую строку', () => {
    expect(reverseString('')).toBe('');
  });

  test('Корректно разворачивает строку с одним символом', () => {
    expect(reverseString('a')).toBe('a');
  });

  test('Корректно разворачивает строку с чётным количеством символов', () => {
    expect(reverseString('abcd')).toBe('dcba');
  });

  test('Корректно разворачивает строку с нечетным количеством символов', () => {
    expect(reverseString('abcde')).toBe('edcba');
  });
});