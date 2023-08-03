interface ITrie {
  contains(value: string): boolean;
  insert(value: string): void;
  remove(value: string): void;
  autocomplete(subString: string): string[];

  get wordsCount(): number;
}

type Node = {
  isWord: boolean;
  children: (Node | null)[];
};

export class Trie implements ITrie {
  private _root: Node;

  // optional fields
  private _wordsCount: number;

  static OFFSET = "a".charCodeAt(0);

  constructor() {
    this._root = Trie.createNode();

    this._wordsCount = 0;
  }

  get wordsCount(): number {
    return this._wordsCount;
  }

  contains(value: string): boolean {
    let curr: Node = this._root!;

    for (let i = 0; i < value.length; i++) {
      const offset = Trie.getCharOffset(value[i]);

      if (!curr.children[offset]) {
        return false;
      }

      curr = curr.children[offset]!;
    }

    return curr.isWord;
  }

  insert(value: string): void {
    let curr: Node = this._root!;

    for (let i = 0; i < value.length; i++) {
      const offset = Trie.getCharOffset(value[i]);

      if (curr.children[offset]) {
        curr = curr.children[offset]!;
      } else {
        curr.children[offset] = Trie.createNode();
        curr = curr.children[offset]!;
      }
    }

    curr.isWord = true;
    this._wordsCount++;
  }

  remove(value: string): void {
    if (value === "") return;

    const nodes = this.getPath(value);

    let curr = nodes.pop();
    let prev = curr;

    if (!curr) return;

    curr.isWord = false;
    this._wordsCount--;

    curr = nodes.pop();

    while (curr) {
      const currChildren = curr.children.filter(Boolean);
      const prevChildren = prev!.children.filter(Boolean);

      // removal of node
      if (
        !curr.isWord &&
        currChildren.length === 1 &&
        currChildren[0] === prev &&
        !prev.isWord &&
        prevChildren.length === 0
      ) {
        curr.children = new Array(26).fill(null);
      }

      prev = curr;
      curr = nodes.pop();
    }
  }

  autocomplete(subValue: string): string[] {
    const words: string[] = [];
    const currentWord: string[] = [];

    function walk(node: Node, index: number) {
      const isLast = node.children.filter(Boolean).length === 0;

      currentWord.push(Trie.getCharFromCode(index));

      if (isLast || node.isWord) {
        words.push(currentWord.join(""));
      }

      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];

        if (child) walk(child, i);
      }

      currentWord.pop();
    }

    const path = this.getPath(subValue);

    const startNode = path.pop();

    if (!startNode) return [];

    for (let i = 0; i < startNode.children.length; i++) {
      const child = startNode.children[i];

      if (child) walk(child, i);
    }

    return words;
  }

  traversePostOrder(callback: (node: Node) => void) {
    this.traversePostOrderRecursion(this._root, callback);
  }

  private getPath(value: string): Node[] {
    const nodes: Node[] = [];

    let curr = this._root;

    for (let i = 0; i < value.length; i++) {
      const offset = Trie.getCharOffset(value[i]);

      const next = curr.children[offset];

      if (!next) return nodes;

      nodes.push(next);
      curr = next;
    }

    return nodes;
  }

  private traversePostOrderRecursion(
    curr: Node,
    callback: (node: Node) => void
  ) {
    for (let i = 0; i < curr.children.length; i++) {
      const child = curr.children[i];

      if (child) this.traversePostOrderRecursion(child, callback);
    }

    callback(curr);
  }

  static createNode(): Node {
    return {
      isWord: false,
      children: new Array(26).fill(null),
    };
  }

  static getCharOffset(char: string): number {
    return char.charCodeAt(0) - Trie.OFFSET;
  }

  // code is relative to "a" (ex. 2 -> "c")
  static getCharFromCode(code: number): string {
    return String.fromCharCode(Trie.OFFSET + code);
  }
}
