import { Node } from "./types.ts";

interface IQueue<T> {
  enqueue(value: T): void;
  deque(): T | undefined;
  peek(): T | undefined;

  get size(): number;
  get list(): T[];
}

export class Queue<T> implements IQueue<T> {
  private _head?: Node<T>;
  private _tail?: Node<T>;
  private _size: number;

  constructor() {
    this._head = undefined;
    this._tail = undefined;

    this._size = 0;
  }

  enqueue(value: T) {
    this._size++;

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

    this._size--;

    const head = this._head;
    this._head = this._head.next;

    if (this._tail === head) this._tail = this._head;

    return head.value;
  }

  peek(): T | undefined {
    return this._head?.value;
  }

  get size(): number {
    return this._size;
  }

  get list(): T[] {
    const res = [];
    let curr = this._head;

    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }

    return res;
  }
}
