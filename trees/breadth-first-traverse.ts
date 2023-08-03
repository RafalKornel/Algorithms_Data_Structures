import { Queue } from "../linked-list/queue.ts";
import type { Node } from "./types.ts";

export function breadthFirstTraverse<T>(root: Node<T>, arr: T[]) {
  const q = new Queue<Node<T>>();

  q.enqueue(root);

  let curr: Node<T> | undefined = q.deque();

  while (curr) {
    arr.push(curr.value!);

    if (curr.left) {
      q.enqueue(curr.left);
    }

    if (curr.right) {
      q.enqueue(curr.right);
    }

    curr = q.deque();
  }
}
