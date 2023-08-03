import type { Node } from "./types.ts";

export function compare<T>(
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
