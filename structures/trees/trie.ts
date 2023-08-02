type Node = {
	isWord: boolean;
	children: (Node | null)[];
}


export class Trie {
	private _root: Node;
	
	// optional fields
	private _wordsCount: number;

	static OFFSET = "a".charCodeAt(0);

	constructor() {
		this._root = Trie.createNode();
		
		this._wordsCount = 0;
	}

	contains(value: string): boolean {
		let curr: Node = this._root!;

		for (let i = 0; i < value.length; i++ ) {
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

		let nodes = this.getPath(value);

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
			if (!curr.isWord && currChildren.length === 1 && currChildren[0] === prev && !prev.isWord && prevChildren.length === 0) {
				curr.children = new Array(26).fill(null);
			}

			prev = curr;
			curr = nodes.pop();
		}
		
	}

	autocomplete(subValue: string): string[] {
		let words: string[] = [];
		let currentWord: string[] = [];

		function walk(node: Node, index: number) {
			const isLast = node.children.filter(Boolean).length === 0;

			currentWord.push(Trie.getCharFromCode(index));

			if (isLast && node.isWord) {
				words.push(currentWord.join(""));

			} else {
				for (let i = 0; i < node.children.length; i++) {
					let child = node.children[i];

					if (child) walk(child, i);
				}
			}

			currentWord.pop();
		}

		const path = this.getPath(subValue);
	
		const startNode = path.pop();

		if (!startNode) return [];		

		for (let i = 0; i < startNode.children.length; i++) {
			let child = startNode.children[i];
			
			if (child) walk(child, i);
		}
		
		return words;
	}


	traversePostOrder(callback: (node: Node) => void) {
		this.traversePostOrderRecursion(this._root, callback);
	}



	private getPath(value: string): Node[] {
		let nodes: Node[] = [];
		
		let curr = this._root;

		for (let i = 0; i < value.length; i++) {
			const offset = Trie.getCharOffset(value[i]);

			let next = curr.children[offset];

			if (!next) return nodes;

			nodes.push(next);
			curr = next;

		}
	
		return nodes;
	}

	private traversePostOrderRecursion(curr: Node, callback: (node: Node) => void) {
		
		for (let i = 0; i < curr.children.length; i++) {
			let child = curr.children[i];

			if (child) this.traversePostOrderRecursion(child, callback);
		}

		callback(curr);

	}
	
	static createNode (): Node {
		return {
			isWord: false,
			children: new Array(26).fill(null),
		}
	}

	static getCharOffset(char: string): number {
		return char.charCodeAt(0) - Trie.OFFSET;

	}

	// code is relative to "a" (ex. 2 -> "c")
	static getCharFromCode(code: number): string {
		return String.fromCharCode(Trie.OFFSET + code);
	}
}

function insertTest() {
	let trie = new Trie();

	console.log(trie.contains("abcde")); // false
	trie.insert("cat");
	console.log(trie.contains("abc")); // false
	trie.insert("dogg");
	console.log(trie.contains("abcd")); // false
	trie.insert("catty");
	
	console.log(trie.contains("abcde")); // false
	console.log(trie.contains("cat")); // true
	console.log(trie.contains("")); // false
	console.log(trie.contains("cats")); // false

}

function removeTest() {
	let trie = new Trie();

	trie.insert("cat");
	trie.insert("cats");

	trie.remove("cats");

	console.log(trie.contains("cats")); // false
	console.log(trie.contains("cat")); // true

	trie.insert("dog");
	trie.insert("dogs");

	trie.remove("dog");

	console.log(trie.contains("dog")); // false
	console.log(trie.contains("dogs")); // true
	
	trie.insert("cats");

	console.log(trie.contains("cats")); // true
}

function autocompleteTest() {
	let trie = new Trie();
	
	trie.insert("cat");
	trie.insert("cats");
	trie.insert("catty");

	trie.insert("comb");	
	
	trie.insert("dog");

	console.log("c: ",trie.autocomplete("c"));
	console.log("d: ",trie.autocomplete("d"));
}

//insertTest();
//removeTest();
autocompleteTest();
