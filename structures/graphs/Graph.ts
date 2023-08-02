export type WeightedAdjacencyMatrix = number[][];

export type GraphNode = number; // index of Graph

export type Edge = { to: GraphNode, weight: number };

export type AdjacencyList = Edge[];

export type Graph = AdjacencyList[];

export const NULL_GRAPH_NODE: GraphNode = -1;
