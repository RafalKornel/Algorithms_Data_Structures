class RingBuffer {
	private _buffer: Uint8Array;
	private _head: number;
	private _tail: number;
	private _length: number;
	private _capacity: number;	

	constructor(initialSize: number) {
		this._buffer = new Uint8Array(initialSize);
		
		this._head = 0;
		this._tail = 0;

		this._length = 0;
		this._capacity = initialSize;
	}

	push(value: number): void {
		this._tail++;
		this._length++;

		if (this._tail % this._capacity === this._head % this._capacity) {
			throw new Error("Buffer overflow");
		}

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


	get length() {
		return this._length;
	}

	get(index: number): number | undefined { 
		return undefined;
	}

	print() {
		let res = "[";

		for (let i = this._head; i < this._tail; i++) {
			res += this._buffer[i % this._capacity];
			res += ", ";
		}

		res += "]";

		console.log(res);
		console.log(this._buffer);
	}
}

const rb = new RingBuffer(5);

rb.push(0);
rb.print();
rb.push(1);
rb.print();

console.log(rb.pop());

rb.print();

rb.push(2);
rb.print();

console.log(rb.pop());
rb.print();

rb.push(3);
console.log(rb.pop());
rb.print();

rb.push(4);
rb.print();

console.log(rb.pop());
rb.print();

rb.push(5);
rb.print();

console.log(rb.pop());
rb.print();

rb.push(6);
rb.print();

console.log(rb.pop());
rb.print();
