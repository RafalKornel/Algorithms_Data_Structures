interface IRingBuffer<T> {
  push(value: T): void;
  pop(): T | undefined;
  get(index: number): T | undefined;

  get length(): number;
  get capacity(): number;
  get list(): T[];
}

/** Works only with number, because it's implemented using UInt8Array.
 *  More general structure can be implemented using standard arrays */
export class IntRingBuffer implements IRingBuffer<number> {
  private _buffer: Uint8Array;
  private _head: number;
  private _tail: number;
  private _length: number;
  private _capacity: number;

  constructor(capacity: number) {
    this._buffer = new Uint8Array(capacity + 1);

    this._head = 0;
    this._tail = 0;

    this._length = 0;
    this._capacity = capacity + 1;
  }

  get length() {
    return this._length;
  }

  get capacity() {
    return this._capacity - 1;
  }

  get list(): number[] {
    const res: number[] = [];

    for (let i = this._head; i < this._tail; i++) {
      res.push(this._buffer[i % this._capacity]);
    }

    return res;
  }

  push(value: number): void {
    if ((this._tail + 1) % this._capacity === this._head % this._capacity) {
      throw new Error("Buffer overflow");
    }

    this._tail++;
    this._length++;

    this._buffer[(this._tail - 1) % this._capacity] = value;
  }

  pop(): number | undefined {
    if (this._tail % this._capacity === this._head % this._capacity) {
      return undefined;
    }

    this._head++;
    this._length--;

    return this._buffer[(this._head - 1) % this._capacity];
  }

  get(index: number): number | undefined {
    const clampedIndex = (this._head + index) % this._capacity;

    if (clampedIndex < this._head && clampedIndex > this._tail)
      return undefined;

    return this._buffer[clampedIndex];
  }
}
