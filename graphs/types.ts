export type Index = number;
export type Value = number;

export type WeightedAdjacencyMatrix = Value[][];

export type GraphNode = number; // index of Graph

export type Edge = { to: GraphNode; weight: number };

export type AdjacencyList = Edge[];

export type Graph = AdjacencyList[];

export const NULL_GRAPH_NODE: GraphNode = -1;
