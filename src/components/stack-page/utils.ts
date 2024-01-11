export class Stack<T> {
  private items: T[] = [];

  push(item: T) {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  clear() {
    this.items = [];
  }

  get length() {
    return this.items.length;
  }

  get itemsArray() {
    return this.items;
  }
}
