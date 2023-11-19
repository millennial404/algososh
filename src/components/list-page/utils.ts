export class LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null | undefined

  constructor(value: T) {
    this.value = value
    this.next = null
  }
}

export class LinkedList<T> {
  head: LinkedListNode<T> | null | undefined
  tail: LinkedListNode<T> | null | undefined

  constructor(initialValues?: T[]) {
    this.head = null
    this.tail = null

    if (initialValues && initialValues.length > 0) {
      initialValues.forEach((value) => {
        this.append(value);
      });
    }
  }

  prepend(value: T) {
    const newNode = new LinkedListNode(value)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head = newNode
    }
  }

  append(value: T) {
    const newNode = new LinkedListNode(value)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail!.next = newNode
      this.tail = newNode
    }
  }

  addByIndex(value: T, index: number) {
    if (index === 0) {
      this.prepend(value)
    } else {
      const newNode = new LinkedListNode(value)
      let currentNode = this.head
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode!.next
      }
      newNode.next = currentNode?.next
      currentNode!.next = newNode
    }
  }

  deleteByIndex(index: number) {
    if (index === 0) {
      this.head = this.head!.next
    } else {
      let currentNode = this.head
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode!.next
      }
      currentNode!.next = currentNode!.next!.next
    }
  }

  deleteHead() {
    this.head = this.head!.next
  }

  deleteTail() {
    let currentNode = this.head
    while (currentNode!.next !== this.tail) {
      currentNode = currentNode!.next
    }
    currentNode!.next = null
    this.tail = currentNode
  }

  toArray() {
    const result = []
    let currentNode = this.head
    while (currentNode) {
      result.push(currentNode.value)
      currentNode = currentNode.next
    }
    return result
  }
}

export const randomArray = (length: number, min: number, max: number) => {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * (max - min) + min));
  }
  return array;
}