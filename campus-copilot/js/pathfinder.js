/**
 * CAMPUS COPILOT - PATHFINDER NAVIGATION ENGINE
 * High-performance Dijkstra/A* graph pathfinding with multi-floor & inter-building transit,
 * wheelchair accessibility constraints, and human turn-by-turn navigation instructions.
 */

class CampusPathfinder {
  constructor(campusData) {
    this.data = campusData;
    this.nodes = campusData.navigationGraph.nodes;
    this.edges = campusData.navigationGraph.edges;
    this.adjacencyList = new Map();
    this.initGraph();
  }

  initGraph() {
    // Initialize node adjacency list
    for (const nodeId in this.nodes) {
      this.adjacencyList.set(nodeId, []);
    }

    // Populate bi-directional edges
    this.edges.forEach(edge => {
      if (!this.nodes[edge.from] || !this.nodes[edge.to]) return;

      this.adjacencyList.get(edge.from).push({
        node: edge.to,
        dist: edge.dist,
        accessible: edge.accessible !== false,
        desc: edge.desc || `Head towards ${this.nodes[edge.to].name}`
      });

      // Reverse direction
      this.adjacencyList.get(edge.to).push({
        node: edge.from,
        dist: edge.dist,
        accessible: edge.accessible !== false,
        desc: edge.desc || `Head towards ${this.nodes[edge.from].name}`
      });
    });
  }

  /**
   * Find node corresponding to location ID or landmark ID
   */
  findNodeForTarget(targetId) {
    // Check if directly a node id
    if (this.nodes[targetId]) {
      return targetId;
    }

    // Search by locationId on node
    for (const [id, node] of Object.entries(this.nodes)) {
      if (node.locationId === targetId) {
        return id;
      }
    }

    // Search by building entrance if building id
    if (targetId.startsWith("block-")) {
      const ent = `ent-${targetId}`;
      if (this.nodes[ent]) return ent;
    }

    // Try matching location in CAMPUS_DATA
    const loc = this.data.locations.find(l => l.id.toLowerCase() === targetId.toLowerCase() || l.roomNumber.toLowerCase() === targetId.toLowerCase());
    if (loc) {
      for (const [id, node] of Object.entries(this.nodes)) {
        if (node.locationId === loc.id) {
          return id;
        }
      }
    }

    return null;
  }

  /**
   * Compute shortest path between startId and endId
   * @param {string} startTarget - Start location or node ID
   * @param {string} endTarget - Destination location or node ID
   * @param {boolean} accessibleOnly - Restrict to wheelchair/elevator accessible paths
   */
  findRoute(startTarget, endTarget, accessibleOnly = false) {
    const startNode = this.findNodeForTarget(startTarget);
    const endNode = this.findNodeForTarget(endTarget);

    if (!startNode || !endNode) {
      return {
        success: false,
        error: `Could not identify path endpoints: ${!startNode ? startTarget : ''} ${!endNode ? endTarget : ''}`.trim()
      };
    }

    if (startNode === endNode) {
      const nodeObj = this.nodes[startNode];
      return {
        success: true,
        startNode,
        endNode,
        totalDistance: 0,
        estimatedTimeMinutes: 1,
        path: [startNode],
        segments: [],
        instructions: ["You are already at your destination!"]
      };
    }

    // Dijkstra's algorithm
    const distances = {};
    const previous = {};
    const edgeUsed = {};
    const unvisited = new Set(Object.keys(this.nodes));

    for (const node in this.nodes) {
      distances[node] = Infinity;
      previous[node] = null;
    }
    distances[startNode] = 0;

    while (unvisited.size > 0) {
      // Pick unvisited node with smallest distance
      let current = null;
      let minDistance = Infinity;

      for (const node of unvisited) {
        if (distances[node] < minDistance) {
          minDistance = distances[node];
          current = node;
        }
      }

      if (current === null || minDistance === Infinity) {
        break; // Remaining nodes unreachable
      }

      if (current === endNode) {
        break; // Destination reached
      }

      unvisited.delete(current);

      const neighbors = this.adjacencyList.get(current) || [];
      for (const edge of neighbors) {
        if (!unvisited.has(edge.node)) continue;
        if (accessibleOnly && !edge.accessible) continue;

        const candidateDist = distances[current] + edge.dist;
        if (candidateDist < distances[edge.node]) {
          distances[edge.node] = candidateDist;
          previous[edge.node] = current;
          edgeUsed[edge.node] = edge;
        }
      }
    }

    if (distances[endNode] === Infinity) {
      return {
        success: false,
        error: accessibleOnly 
          ? "No wheelchair-accessible path found. Try disabling wheelchair access to check standard routes."
          : "No route could be found connecting these two campus spots."
      };
    }

    // Reconstruct path
    const path = [];
    let curr = endNode;
    while (curr) {
      path.unshift(curr);
      curr = previous[curr];
    }

    // Generate readable instructions and segment by floor / building
    const { instructions, segments } = this.generateInstructions(path, edgeUsed);

    // Calculate realistic walking time: ~1.2 m/s (~72 m/min) + 30s per transit floor transition
    const totalDistMeters = Math.round(distances[endNode]);
    let verticalTransitions = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const n1 = this.nodes[path[i]];
      const n2 = this.nodes[path[i+1]];
      if (n1.floor !== n2.floor) verticalTransitions++;
    }
    const walkingMinutes = Math.max(1, Math.round((totalDistMeters / 70) + (verticalTransitions * 0.7)));

    return {
      success: true,
      startNode,
      endNode,
      totalDistance: totalDistMeters,
      estimatedTimeMinutes: walkingMinutes,
      accessible: accessibleOnly,
      path,
      segments,
      instructions
    };
  }

  /**
   * Produce structured segments and turn-by-turn text instructions
   */
  generateInstructions(pathNodes, edgeUsed) {
    const instructions = [];
    const segments = [];

    let currentSegment = null;

    for (let i = 0; i < pathNodes.length; i++) {
      const currentNode = this.nodes[pathNodes[i]];
      const isStart = (i === 0);
      const isEnd = (i === pathNodes.length - 1);

      // Determine segment (e.g. "outdoor", "block-a-floor-0", etc.)
      const segmentKey = currentNode.building === "outdoor" 
        ? "outdoor" 
        : `${currentNode.building}-f${currentNode.floor}`;

      if (!currentSegment || currentSegment.key !== segmentKey) {
        if (currentSegment) {
          segments.push(currentSegment);
        }
        currentSegment = {
          key: segmentKey,
          building: currentNode.building,
          floor: currentNode.floor,
          nodes: [pathNodes[i]],
          instructions: []
        };
      } else {
        currentSegment.nodes.push(pathNodes[i]);
      }

      if (isStart) {
        const startDesc = `Start from ${currentNode.name}`;
        instructions.push({
          step: 1,
          icon: "pin-start",
          text: startDesc,
          nodeId: pathNodes[i],
          building: currentNode.building,
          floor: currentNode.floor
        });
        currentSegment.instructions.push(startDesc);
        continue;
      }

      const prevNode = this.nodes[pathNodes[i - 1]];
      const edge = edgeUsed[pathNodes[i]];

      // Check transition types
      let text = "";
      let icon = "walk";

      if (prevNode.building !== currentNode.building && currentNode.building !== "outdoor") {
        const bldgObj = this.data.buildings.find(b => b.id === currentNode.building);
        text = `Enter ${bldgObj ? bldgObj.name : currentNode.building}`;
        icon = "door-enter";
      } else if (prevNode.floor !== currentNode.floor) {
        const isElev = prevNode.isVerticalTransit && (prevNode.verticalGroup?.includes("elev") || currentNode.verticalGroup?.includes("elev"));
        const dir = currentNode.floor > prevNode.floor ? "Up" : "Down";
        const targetFloorName = currentNode.floor === 0 ? "Ground Floor" : `Floor ${currentNode.floor}`;
        text = isElev 
          ? `Take Elevator ${dir} to ${targetFloorName}` 
          : `Take Stairs ${dir} to ${targetFloorName}`;
        icon = isElev ? "elevator" : "stairs";
      } else if (isEnd) {
        text = `Arrive at ${currentNode.name}`;
        icon = "pin-end";
      } else {
        text = edge && edge.desc ? edge.desc : `Continue forward towards ${currentNode.name}`;
      }

      instructions.push({
        step: instructions.length + 1,
        icon,
        text,
        dist: edge ? edge.dist : 0,
        nodeId: pathNodes[i],
        building: currentNode.building,
        floor: currentNode.floor
      });
      currentSegment.instructions.push(text);
    }

    if (currentSegment) {
      segments.push(currentSegment);
    }

    return { instructions, segments };
  }

  /**
   * Find nearby locations given a current node
   */
  getNearbyLocations(nodeId, radiusMeters = 60) {
    const origin = this.nodes[nodeId];
    if (!origin) return [];

    const nearby = [];
    for (const [id, node] of Object.entries(this.nodes)) {
      if (id === nodeId || !node.locationId) continue;
      // In same building & same floor
      if (node.building === origin.building && node.floor === origin.floor) {
        const loc = this.data.locations.find(l => l.id === node.locationId);
        if (loc) nearby.push(loc);
      }
    }
    return nearby;
  }
}

// Export to window
if (typeof window !== "undefined") {
  window.CampusPathfinder = CampusPathfinder;
}
