/* Creates a map with edges and nodes that is more representative of actual
traffic patterns than the default map above */
function trafficMap() {
  // Create 18 Intersections
  var node1 = new partialIntersection("Node 1", [0, 0]);
  var node2 = new partialIntersection("Node 2", [1, 2]);
  var node3 = new partialIntersection("Node 3", [0, 5]);
  var node4 = new partialIntersection("Node 4", [3, 0]);
  var node5 = new partialIntersection("Node 5", [3, 1]);
  var node6 = new partialIntersection("Node 6", [3, 3]);
  var node7 = new partialIntersection("Node 7", [2, 4]);
  var node8 = new partialIntersection("Node 8", [4, 4]);
  var node9 = new partialIntersection("Node 9", [5, 2]);
  var node10 = new partialIntersection("Node 10", [5, 0]);
  var node11 = new partialIntersection("Node 11", [6, 1]);
  var node12 = new partialIntersection("Node 12", [7, 3]);
  var node13 = new partialIntersection("Node 13", [8, 2]);
  var node14 = new partialIntersection("Node 14", [7, 0]);
  var node15 = new partialIntersection("Node 15", [8, 0]);
  var node16 = new partialIntersection("Node 16", [9, 1]);
  var node17 = new partialIntersection("Node 17", [10, 3]);
  var node18 = new partialIntersection("Node 18", [8, 5]);

  // Create 28 Streets
  var edge1 = new Street("Edge 1", node1, node4, 1, "Highway");
  var edge2 = new Street("Edge 2", node1, node2, 1, "Side-road");
  var edge3 = new Street("Edge 3", node4, node5, 1, "Side-road");
  var edge4 = new Street("Edge 4", node2, node6, 1, "Main-road");
  var edge5 = new Street("Edge 5", node5, node6, 1, "Side-road");
  var edge6 = new Street("Edge 6", node3, node2, 1, "Side-road");
  var edge7 = new Street("Edge 7", node3, node7, 1, "Side-road");
  var edge8 = new Street("Edge 8", node7, node6, 1, "Side-road");
  var edge9 = new Street("Edge 9", node6, node8, 1, "Main-road");
  var edge10 = new Street("Edge 10", node8, node9, 1, "Side-road");
  var edge11 = new Street("Edge 11", node5, node9, 1, "Main-road");
  var edge12 = new Street("Edge 12", node5, node10, 1, "Side-road");
  var edge13 = new Street("Edge 13", node4, node10, 1, "Highway");
  var edge14 = new Street("Edge 14", node10, node14, 1, "Highway");
  var edge15 = new Street("Edge 15", node10, node11, 1, "Main-road");
  var edge16 = new Street("Edge 16", node9, node11, 1, "Side-road");
  var edge17 = new Street("Edge 17", node9, node12, 1, "Main-road");
  var edge18 = new Street("Edge 18", node11, node12, 1, "Side-road");
  var edge19 = new Street("Edge 19", node11, node13, 1, "Main-road");
  var edge20 = new Street("Edge 20", node14, node13, 1, "Side-road");
  var edge21 = new Street("Edge 21", node14, node15, 1, "Highway");
  var edge22 = new Street("Edge 22", node15, node16, 1, "Main-road");
  var edge23 = new Street("Edge 23", node13, node16, 1, "Side-road");
  var edge24 = new Street("Edge 24", node16, node17, 1, "Main-road");
  var edge25 = new Street("Edge 25", node13, node17, 1, "Main-road");
  var edge26 = new Street("Edge 26", node18, node17, 1, "Side-road");
  var edge27 = new Street("Edge 27", node12, node18, 1, "Main-road");
  var edge28 = new Street("Edge 28", node12, node13, 1, "Side-road");

  // Populate streetList of all Intersections
  node1.streetList.push(edge1, edge2);
  node2.streetList.push(edge2, edge4, edge6);
  node3.streetList.push(edge6, edge7);
  node4.streetList.push(edge1, edge3, edge13);
  node5.streetList.push(edge3, edge12, edge11, edge5);
  node6.streetList.push(edge5, edge4, edge8, edge9);
  node7.streetList.push(edge7, edge8);
  node8.streetList.push(edge9, edge10);
  node9.streetList.push(edge10, edge11, edge16, edge17);
  node10.streetList.push(edge12, edge13, edge14, edge15);
  node11.streetList.push(edge15, edge16, edge18, edge19);
  node12.streetList.push(edge17, edge18, edge27, edge28);
  node13.streetList.push(edge19, edge20, edge23, edge25, edge28);
  node14.streetList.push(edge14, edge20, edge21);
  node15.streetList.push(edge21, edge22);
  node16.streetList.push(edge22, edge23, edge24);
  node17.streetList.push(edge25, edge24, edge26);
  node18.streetList.push(edge26, edge27);

  // Add streets and intersections to the object
  this.streets = [edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9,
                  edge10, edge11, edge12, edge13, edge14, edge15, edge16, edge17,
                  edge18, edge19, edge20, edge21, edge22, edge23, edge24, edge25,
                  edge26, edge27, edge28];
  this.intersections = [node1, node2, node3, node4, node5, node6, node7, node8,
                        node9, node10, node11, node12, node13, node14, node15,
                        node16, node17, node18];
};
