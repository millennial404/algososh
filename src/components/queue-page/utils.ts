export class Queue<T> {
  private queue: T[] = [];

  enqueue(item: T) {
    this.queue.push(item);
  }

  dequeue() {
    return this.queue.shift();
  }

  clear() {
    this.queue = [];
  }

  get isEmpty() { return !this.queue.length; }

  get elements() {
    return this.queue
  }

  get head() {
    return this.queue[0]
  }

  get tail() {
    return this.queue[this.queue.length - 1]
  }
  }