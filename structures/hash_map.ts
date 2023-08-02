import { UniDirectionalList } from "./linked/linked_list.ts";

type Bucket<TKey extends number | string, TValue> = UniDirectionalList<
	[TKey, TValue]
>;

class HashMap<TKey extends number | string, TValue> {
	private _buckets: Bucket<TKey, TValue>[]; // ArrayList
	private _length: number;
	private _capacity: number;

	static DOWNSIZE_THRESHOLD = 0.2;
	static UPSIZE_THRESHOLD = 0.8;
	static MIN_CAPACITY = 5;
	static INITIAL_CAPACITY = 10;

	constructor() {
		this._length = 0;
		this._capacity = HashMap.INITIAL_CAPACITY;

		this._buckets = this.getBuckets(HashMap.INITIAL_CAPACITY);
	}

	set(key: TKey, value: TValue) {
		const bucket = this.getBucket(key);

		// is bucket contains key and value, then return
		if (bucket.has(([k, v]) => k === key && v === value)) return;

		// for updating
		bucket.remove(([k]) => k === key);

		bucket.push([key, value]);

		this._length++;

		if (this.loadFactor >= HashMap.UPSIZE_THRESHOLD) this.resize("up");
	}

	get(key: TKey): TValue | undefined {
		const bucket = this.getBucket(key);

		const item = bucket.find(([k]) => k === key);

		return item && item[1];
	}

	remove(key: TKey) {
		const bucket = this.getBucket(key);

		const removedItem = bucket.remove(([k]) => k === key);

		if (removedItem) {
			this._length--;
		}

		if (
			this.loadFactor <= HashMap.DOWNSIZE_THRESHOLD &&
			this._capacity > HashMap.MIN_CAPACITY
		) this.resize("down");
	}

	resize(direction: "up" | "down") {
		let tuples: [TKey, TValue][] = [];

		for (let i = 0; i < this._buckets.length; i++) {
			const valuesInBucket = this._buckets[i].toArray();

			for (let j = 0; j < valuesInBucket.length; j++) {
				tuples.push(valuesInBucket[j]);
			}
		}

		const factor = direction === "up" ? 2 : 0.5;

		this._capacity = Math.ceil(this._capacity * factor);
		this._length = 0;

		this._buckets = this.getBuckets(this._capacity);

		for (let i = 0; i < tuples.length; i++) {
			this.set(...tuples[i]);
		}
	}

	get loadFactor(): number {
		return this._length / this._capacity;
	}

	private getBucket(key: TKey): Bucket<TKey, TValue> {
		const hash = this.hash(key);

		const bucketIndex = hash % this._capacity;

		const bucket = this._buckets[bucketIndex];

		if (!bucket) throw new Error("Bucket not found. Something went wrong");

		return bucket;
	}

	private hash(key: TKey) {
		if (typeof key === "number") return key; // lol

		let hash = 0;

		for (let i = 0; i < key.length; i++) {
			let chr = key.charCodeAt(i);
			hash = (hash << 5) - hash + chr;
			hash |= 0; // Convert to 32bit integer
		}

		return hash;
	}

	private getBuckets(length: number): Bucket<TKey, TValue>[] {
		return new Array(length).fill(null).map(() =>
			new UniDirectionalList<[TKey, TValue]>()
		);
	}
}

function test() {
	let map = new HashMap<string, number>();

	map.set("dupa", 10);
	console.log(map.get("dupa")); // 10

	console.log(map.loadFactor); // 0.2

	console.log(map.get("dup")); // undefined

	map.set("dupa", 11);
	console.log(map.get("dupa")); // 11

	map.remove("dupa");
	console.log(map.get("dupa")); // undefined

	map.set("dd", 10);
	map.set("ss", 20);
	map.set("ee", 30);

	console.log(map.get("ss"));
}

test();

function resizeTest() {
	let map = new HashMap<string, number>();

	console.log(map.loadFactor); // 0;

	map.set("a", 1);
	console.log(map.loadFactor); // 0.1;
	map.set("b", 1);
	console.log(map.loadFactor); // 0.2;
	map.set("c", 1);
	console.log(map.loadFactor); // 0.3;
	map.set("d", 1);
	console.log(map.loadFactor); // 0.4;
	map.set("e", 1);
	console.log(map.loadFactor); // 0.5;
	map.set("f", 1);
	console.log(map.loadFactor); // 0.6;
	map.set("g", 1);
	console.log(map.loadFactor); // 0.7;
	map.set("h", 1);
	console.log(map.loadFactor); // 0.4;
	map.set("i", 1);
	console.log(map.loadFactor); // 0.45;
	map.set("j", 1);
	console.log(map.loadFactor); // 0.5;

	console.log("removing");

	map.remove("a");
	console.log(map.loadFactor); // 0.45;
	map.remove("b");
	console.log(map.loadFactor); // 0.4;
	map.remove("c");
	console.log(map.loadFactor); // 0.35;
	map.remove("d");
	console.log(map.loadFactor); // 0.3;
	map.remove("e");
	console.log(map.loadFactor); // 0.25;
	map.remove("f");
	console.log(map.loadFactor); // 0.2;
	map.remove("g");
	console.log(map.loadFactor); // 0.4;
	map.remove("h");
	console.log(map.loadFactor); // 0.2;
	map.remove("i");
	console.log(map.loadFactor); // 0.2;

	console.log(map.loadFactor); // 0.2
}
