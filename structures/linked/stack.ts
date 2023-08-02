import { Node } from "./Node";

class Stack<T> {
  private _head?: Node<T>;

  constructor(initialValue: T) {
    this._head = { value: initialValue };
  }

  peek(): T | undefined {
    return this._head?.value;
  }

  push(value: T) {
    const head = this._head;

    this._head = { value, next: head };
  }

  pop(): T | undefined {
    const head = this._head;

    this._head = head?.next;

    return head?.value;
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

const s = new Stack(0);

s.print();

s.push(1);
s.push(2);
s.push(3);
s.push(4);

s.print();

console.log(s.pop());

s.print();

console.log(s.pop());
s.print();

console.log(s.pop());
s.print();
console.log(s.pop());
s.print();

console.log(s.pop());
s.print();
console.log(s.pop());
s.print();

console.log(s.pop());
s.print();
