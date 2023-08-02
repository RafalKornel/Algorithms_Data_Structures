import { Node } from "./Node.ts";

export class Queue<T> {
  private _head?: Node<T>;
  private _tail?: Node<T>;
  private _length: number;

  constructor() {
    this._head = undefined; // { value: initialValue };
    this._tail = undefined; // this._head;

    this._length = 0;
  }

  enqueue(value: T) {
    this._length++;

    // entry to the queue
    if (!this._tail && !this._head) {
      this._head = { value };
      this._tail = this._head;
      return;
    }

    if (!this._tail) {
      this._tail = { value };
      return;
    }

    this._tail.next = { value };

    this._tail = this._tail.next;
  }

  deque(): T | undefined {
    if (!this._head) return undefined;

    this._length--;

    const head = this._head;
    this._head = this._head.next;

    if (this._tail === head) this._tail = this._head;

    return head.value;
  }

  peek(): T | undefined {
    return this._head?.value;
  }

  get length(): number {
    return this._length;
  }

  print() {
    let res = "[";
    let curr = this._head;

    while (curr) {
      res += `${curr.value}, `;
      curr = curr.next;
    }

    res += "]";

    console.log(res);
  }
}

function main() {
  const q = new Queue<number>();

  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);

  q.print();

  console.log(q.peek());

  q.deque();
  q.print();
  q.deque();
  q.print();
  q.deque();
  q.print();

  console.log(q.peek());

  q.enqueue(4);
  q.enqueue(5);

  q.print();
}

