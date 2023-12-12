export class Queue<T> {
  private items: T[] = [];

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }

  clear() {
    this.items = [];
  }

  get isEmpty() { return !this.items.length; }

  get elements() {
    return this.items
  }

  get head() {
    return this.items[0]
  }

  get tail() {
    return this.items[this.items.length - 1]
  }
  }