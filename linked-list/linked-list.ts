import { Node } from "./types.ts";

interface IUniDirectionalList<T> {
  get length(): number;
  push(value: T): void;
  get(index: number): T | undefined;
  pop(): T | undefined;
  remove(val: T): T | undefined;
  prepend(): T | undefined;
  append(val: T): void;
}

export class UniDirectionalList<T extends number | string | object>
  implements IUniDirectionalList<T>
{
  private _head?: Node<T>;
  private _tail?: Node<T>;
  private _length: number;

  constructor() {
    this._head = undefined;
    this._tail = undefined;

    this._length = 0;
  }

  get length(): number {
    return this._length;
  }

  append(value: T) {
    const newHead = { value, next: this._head };
    this._head = newHead;

    if (!this._tail) {
      this._tail = newHead;
    }

    this._length++;
  }

  prepend(): T | undefined {
    const currHead = this._head;
    if (!currHead) return undefined;

    this._head = currHead.next;

    if (this._tail === currHead) {
      this._tail = undefined;
    }

    this._length--;

    return currHead.value;
  }

  push(value: T) {
    const curr = this._head;

    if (!curr) {
      this._length = 1;

      this._head = { value };
      this._tail = this._head;

      return;
    }

    if (!this._tail)
      throw new Error("Something went wrong. Expected tail to exist.");

    this._length++;

    this._tail.next = { value };
    this._tail = this._tail.next;
  }

  pop(): T | undefined {
    if (!this._head) return undefined;

    this._length--;

    if (!this._head.next) {
      const tmp = this._head;

      this._head = undefined;
      this._tail = undefined;

      return tmp.value;
    }

    let prev = undefined;
    let curr = this._head;

    while (curr.next) {
      prev = curr;
      curr = curr.next;
    }

    // at this point, curr is last the element

    prev!.next = undefined;
    this._tail = prev;

    return curr.value;
  }

  get(index: number): T | undefined {
    let curr = this._head;

    if (!curr) return undefined;

    for (let i = 0; i < index; i++) {
      curr = curr?.next;
    }

    return curr?.value;
  }

  find(predicate: (val: T) => boolean): T | undefined {
    let curr = this._head;

    while (curr) {
      if (predicate(curr.value)) return curr.value;
      curr = curr.next;
    }

    return undefined;
  }

  has(predicate: (value: T) => boolean): boolean {
    let curr = this._head;

    while (curr) {
      if (predicate(curr.value)) return true;

      curr = curr.next;
    }

    return false;
  }

  remove(valOrPredicate: T | ((v: T) => boolean)) {
    let prev = undefined;
    let curr = this._head;

    while (curr) {
      const shouldCurrentBeRemoved =
        typeof valOrPredicate === "function"
          ? valOrPredicate(curr.value)
          : curr.value === valOrPredicate;

      if (shouldCurrentBeRemoved) {
        if (prev) {
          prev.next = curr.next;
          if (this._tail === curr) {
            this._tail = prev;
          }
        } else {
          this._head = curr.next;
        }

        this._length--;
        return curr.value;
      }

      prev = curr;
      curr = curr.next;
    }

    return undefined;
  }

  toArray(): T[] {
    const values: T[] = [];

    let curr = this._head;

    while (curr) {
      values.push(curr.value);
      curr = curr.next;
    }

    return values;
  }

  print() {
    const values = this.toArray();
    console.log(values);
  }
}
