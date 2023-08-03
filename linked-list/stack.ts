import { Node } from "./types.ts";

interface IStack<T> {
  peek(): T | undefined;
  push(value: T): void;
  pop(): T | undefined;

  get size(): number;
  get list(): T[];
}

export class Stack<T> implements IStack<T> {
  private _head?: Node<T>;
  private _size: number;

  constructor() {
    this._head = undefined;
    this._size = 0;
  }

  peek(): T | undefined {
    return this._head?.value;
  }

  push(value: T) {
    const head = this._head;

    this._head = { value, next: head };

    this._size++;
  }

  pop(): T | undefined {
    const head = this._head;

    this._head = head?.next;

    if (head) {
      this._size--;
    }

    return head?.value;
  }

  get size(): number {
    return this._size;
  }

  get list(): T[] {
    const res: T[] = [];

    let curr = this._head;

    while (curr) {
      res.push(curr.value);

      curr = curr.next;
    }

    return res;
  }
}
