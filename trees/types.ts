export type Node<T> = {
  value: T | undefined;
  left?: Node<T>;
  right?: Node<T>;
};
