import { UniDirectionalList } from "../linked/linked_list.ts";

interface IHashMap<TKey extends number | string, TValue> {
  get(key: TKey): TValue | undefined;
  set(key: TKey, value: TValue): void;
  remove(key: TKey): void;
  get loadFactor(): number;
}

/** This could also be ArrayList - JS native array structure */
type Bucket<TKey extends number | string, TValue> = UniDirectionalList<
  [TKey, TValue]
>;

export class HashMap<TKey extends number | string, TValue>
  implements IHashMap<TKey, TValue>
{
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
    )
      this.resize("down");
  }

  get loadFactor(): number {
    return this._length / this._capacity;
  }

  private resize(direction: "up" | "down") {
    const tuples: [TKey, TValue][] = [];

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
      const chr = key.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }

    return hash;
  }

  private getBuckets(length: number): Bucket<TKey, TValue>[] {
    return new Array(length)
      .fill(null)
      .map(() => new UniDirectionalList<[TKey, TValue]>());
  }
}
