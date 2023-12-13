export class Queue<T> {
  private readonly container: T[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number;
  private length = 0;

  constructor(size: number, defaultValue: T) {
    this.size = size;
    this.container = new Array(size).fill(defaultValue);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      return
    }

    this.container[this.tail] = item;
    this.tail = (this.tail + 1);
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty) {
      return
    }

    this.container[this.head] = '' as unknown as T;
    this.head = (this.head + 1);
    this.length--;
  };

  peek = (): T | null => {
    if (this.isEmpty) {
      throw new Error("No elements in the queue");
    }

    return this.container[this.head];
  };

  get isEmpty() {
    let flag = true
    this.container.forEach((char: T) => {
      if (char !== '' as unknown as T) {
        flag = false
      }
    })
    return flag
  }

  get elements() {
    return this.container
  }

  get headIndex() {
    return this.head
  }

  get tailIndex() {
    return this.tail
  }

  clear = () => {
    this.container.fill('' as unknown as T);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }
}