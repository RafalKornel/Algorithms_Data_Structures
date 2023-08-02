import { Queue } from "../linked/queue.ts";
import { Node } from "./Node.ts";

function breadthFirstTraverse<T>(root: Node<T>) {
  let q = new Queue<Node<T>>(root);

  let curr: Node<T> | undefined = q.deque();

  while (curr) {
    console.log(curr.value);

    if (curr.left) {
      q.enqueue(curr.left);
    }

    if (curr.right) {
      q.enqueue(curr.right);
    }

    curr = q.deque();
  }
}
