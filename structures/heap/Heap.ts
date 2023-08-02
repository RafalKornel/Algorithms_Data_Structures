export class Heap {
  // this should be ArrayList for best performance of push/pop operation
  private _list: number[];
  private _length: number;

  public readonly type: "min" | "max";

  constructor(type: "min" | "max") {
    this._list = [];
    this._length = 0;

    this.type = type;
  }

  get length() {
    return this._length;
  }

  // O(1)
  peek(): number | undefined {
    if (this._length === 0) return undefined;

    return this._list[0];
  }

  // O(logn) because heap is always a full tree (meaning h === logn)
  add(value: number) {
    this._list.push(value);

    this.bubbleUp(this._length);

    this._length++;
  }

  // O(logn) because heap is always a full tree (meaning h === logn)
  remove(): number | undefined {
    if (this._length === 0) return undefined;

    if (this._length === 1) {
      this._length--;
      return this._list.pop();
    }

    const value = this._list[0];

    const last = this._list.pop() as number;

    this._length--;

    this._list[0] = last;

    this.bubbleDown(0);

    return value;
  }

  bubbleDown(index: number): void {
    if (index >= this._length) return;

    const value = this._list[index];

    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);

    if (leftChildIndex > this._length) return;

    const leftChild = this._list[leftChildIndex];
    const rightChild = this._list[rightChildIndex];

    if (
      rightChild &&
      this.compare(leftChild, rightChild) &&
      this.compare(value, rightChild)
    ) {
      this._list[index] = rightChild;
      this._list[rightChildIndex] = value;

      return this.bubbleDown(rightChildIndex);
    }

    if (this.compare(value, leftChild)) {
      this._list[index] = leftChild;
      this._list[leftChildIndex] = value;

      return this.bubbleDown(leftChildIndex);
    }
  }

  printList() {
    return this._list.toString();
  }

  validate(): boolean {
    for (let i = 1; i < this._length; i++) {
      const parentIndex = this.getParentIndex(i);

      if (parentIndex === undefined) return false;

      if (this.compare(this._list[parentIndex], this._list[i])) return false;
    }

    return true;
  }

  private bubbleUp(currentIndex: number) {
    if (currentIndex === 0 || currentIndex > this._length) return;

    const currentValue = this._list[currentIndex];

    const parentIndex = this.getParentIndex(currentIndex);
    const parentValue = this._list[parentIndex];

    if (!this.compare(parentValue, currentValue)) return;

    this._list[currentIndex] = parentValue;
    this._list[parentIndex] = currentValue;

    this.bubbleUp(parentIndex);
  }

  private getLeftChildIndex(i: number): number {
    return i * 2 + 1;
  }

  private getRightChildIndex(i: number): number {
    return i * 2 + 2;
  }

  private getParentIndex(j: number): number {
    return Math.floor((j - 1) / 2);
  }

  private compare(parent: number, child: number, inclusive = false): boolean {
    if (this.type === "max") {
      return inclusive ? parent <= child : parent < child;
    } else {
      return inclusive ? parent >= child : parent > child;
    }
  }
}
