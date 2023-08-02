import type { Node } from "./Node.ts";
import { root } from "./example.ts";

function compare<T>(
  rootA: Node<T> | undefined,
  rootB: Node<T> | undefined
): boolean {
  // structural check
  if (rootA === undefined && rootB === undefined) return true;

  // structural check
  if (rootA === undefined || rootB === undefined) return false;

  // value check
  if (rootA?.value !== rootB?.value) return false;

  return (
    compare(rootA?.left, rootB?.left) && compare(rootA?.right, rootB?.right)
  );
}

function compareTest() {
  let rootA: Node<number> = root;
  let rootB: Node<number> = { value: 7 };

  rootB.left = { value: 23, left: { value: 5 }, right: { value: 4 } };
  rootB.right = { value: 3, left: { value: 18 }, right: { value: 21 } };

  let rootC: Node<number> = { value: 7 };

  rootC.left = { value: 23, left: { value: 5 }, right: { value: 4 } };
  rootC.right = { value: 3, left: { value: 18, left: { value: 21 } } };

  console.log("compare(rootA, rootB): ", compare(rootA, rootB)); // true

  console.log("compare(rootA, rootC): ", compare(rootA, rootC)); // false;

  console.log("compare(rootB, rootC): ", compare(rootB, rootC)); // false;
}

compareTest();
