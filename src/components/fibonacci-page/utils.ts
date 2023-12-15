const fib = (n: number): number => {
  if (n <= 2) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}

export const getFibonacciNumbers = (n: number): number[] => {
  const arr = [];
  for (let i = 1; i <= n + 1; i++) {
    arr.push(fib(i));
  }
  return arr;
}