






/* ============================ */ 

/*
  connections format
  [ up, right, down, left ]
*/

// TODO: GENERATE THIS FROM A BIGGER PICTURE

const patterns = [
  {
    id: 0,
    connections: [ 
      [ 0, 1, 3, 6, 7, 8, "A" ],
      [ 0, 2, 3, 4, 7, 8, 9 ],
      [ 0, 1, 4, 5, 8, 9, "A" ],
      [ 0, 2, 5, 6, 7, 9, "A"]
    ],
    pattern: "   " +
             "   " +
             "   ",
  },
  {
    id: 1,
    connections: [ 
      [ 0, 1, 3, 6, 7, 8, "A" ],
      [ 1, 5, 6, "A" ],
      [ 0, 1, 4, 5, 8, 9, "A" ],
      [ 1, 3, 4, 8 ] 
    ],
    pattern: "   " +
             "XXX" +
             "   ",
  },
  {
    id: 2,
    connections: [ 
      [ 2, 4, 5, 9 ],
      [ 0, 2, 3, 4, 7, 8, 9 ],
      [ 2, 3, 6, 7 ],
      [ 0, 2, 5, 6, 7, 9, "A"]
    ],
    pattern: " X " +
             " X " +
             " X ",
  },
  {
    id: 3,
    connections: [ 
      [ 2, 4, 5, 9 ],
      [ 1, 5, 6, "A" ],
      [ 0, 1, 4, 5, 8, 9, "A" ],
      [ 0, 2, 5, 6, 7, 9, "A"]
    ],
    pattern: " X " +
             " XX" +
             "   ",
  },
  {
    id: 4,
    connections: [ 
      [ 0, 1, 3, 6, 7, 8, "A" ],
      [ 1, 5, 6, "A" ],
      [ 2, 3, 6, 7 ],
      [ 0, 2, 5, 6, 7, 9, "A"]
    ],
    pattern: "   " +
             " XX" +
             " X ",
  },
  {
    id: 5,
    connections: [ 
      [ 0, 1, 3, 6, 7, 8, "A" ],
      [ 0, 2, 3, 4, 7, 8, 9 ],
      [ 2, 3, 6, 7 ],
      [ 1, 3, 4, 8 ] 
    ],
    pattern: "   " +
             "XX " +
             " X ",
  },
  {
    id: 6,
    connections: [ 
      [ 2, 4, 5, 9 ],
      [ 0, 2, 3, 4, 7, 8, 9 ],
      [ 0, 1, 4, 5, 8, 9, "A" ],
      [ 1, 3, 4, 8 ] 
    ],
    pattern: " X " +
             "XX " +
             "   ",
  },
  {
    id: 7,
    connections: [ 
      [ 2, 4, 5, 9 ],
      [ 0, 2, 3, 4, 7, 8, 9 ],
      [ 0, 1, 4, 5, 8, 9, "A" ],
      [ 0, 2, 5, 6, 7, 9, "A"]
    ],
    pattern: " X " +
             " X " +
             "   ",
  },
  {
    id: 8,
    connections: [ 
      [ 0, 1, 3, 6, 7, 8, "A" ],
      [ 1, 5, 6, "A" ],
      [ 0, 1, 4, 5, 8, 9, "A" ],
      [ 0, 2, 5, 6, 7, 9, "A"]
    ],
    pattern: "   " +
             " XX" +
             "   ",
  },
  {
    id: 9,
    connections: [ 
      [ 0, 1, 3, 6, 7, 8, "A" ],
      [ 0, 2, 3, 4, 7, 8, 9 ],
      [ 2, 3, 6, 7 ],
      [ 0, 2, 5, 6, 7, 9, "A"]
    ],
    pattern: "   " +
             " X " +
             " X ",
  },
  {
    id: "A",
    connections: [ 
      [ 0, 1, 3, 6, 7, 8, "A" ],
      [ 0, 2, 3, 4, 7, 8, 9 ],
      [ 0, 1, 4, 5, 8, 9, "A" ],
      [ 1, 3, 4, 8 ] 
    ],
    pattern: "   " +
             "XX " +
             "   ",
  },
]
/* ============================ */

class WaveFunctionCollapse {
  constructor(grid) {
    this.grid = grid
  }

  findCellWithLeastEntropy() {
    let cells = this.grid.cells
    cells = cells.sort((a, b) => a.entropy < b.entropy)
    cells = cells.filter(a => a.entropy !== 0)
    return cells[0]
  }

  propagateCellChangesStartingFromCell(cell) {
    if (cell.entropy > 0) {
      console.log("Cell's entropy needs to be 0 for propagation to happen")
      return
    }

    console.log("propagate");
    // breath first
    const visited = []
    const queue = [ cell ]


    while (queue.length > 0) {
      console.log(`Queue size: ${queue.length}`);
      
      const current = queue.splice(0, 1)[0]
      const x = current.x
      const y = current.y

      const neighbors = []

      // add neighbors to queue
      for (let dx = -1; dx < 2; dx += 2) {
        if (x + dx > 0 && x + dx < this.grid.width) {
          const next = this.grid.get(x + dx, y)
          if (!visited.includes(next) && !queue.includes(next)) {
            neighbors.push(next)
          }
        }
      }
      
      for (let dy = -1; dy < 2; dy += 2) {
        if (y + dy > 0 && y + dy < this.grid.height) {
          const next = this.grid.get(x, y + dy)
          if (!visited.includes(next) && !queue.includes(next)) {
            neighbors.push(next)
          }
        }
      }

      console.log("Remove invalid states from neighbors");
      console.log({neighbors});
      console.log({current})

      // TODO: START HERE :)
      break

    }
  }

  isCollapsed() {
    return this.grid.cells.every(cell => cell.entropy === 0)
  }
}

class Grid {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.cells = []
  }

  nextCellWithMinEntropy() {
    let cells = this.cells
    cells = cells.sort((a, b) => a.entropy < b.entropy)
    cells = cells.filter(a => a.entropy !== entropyToFilter)
    return cells[0]
  }

  get(x, y) {
    return this.cells[this.width * y + x]
  }

  add(cell) {
    this.cells.push(cell)
  }

  print() {
    let output = ""
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cell = this.get(x, y)
        const entropy = cell.entropy
        output += entropy === 0 ? cell.state[0].toString() : "?"
      }
  
      output += "\n" // Line change
    }
  
    console.log(output + "\n"); // Print and line change
  }
}

class Cell {
  constructor(x, y, state) {
    this.x = x
    this.y = y
    this.state = state
  }

  get entropy() {
    return this.state.length - 1
  }
}



// init
const width = 20
const height = 20

const grid = new Grid(width, height)
for (let x = 0; x < grid.width; x++)
  for (let y = 0; y < grid.height; y++)
    grid.add(
      new Cell(
        x, y,
        Array.from({ length: patterns.length }).map((_, i) => patterns[i].id)
      )
    )

const wfc = new WaveFunctionCollapse(grid)

grid.print()


let i = 0

// start wave function collapse
while (!wfc.isCollapsed()) {
  const cell = wfc.findCellWithLeastEntropy()

  // Remove random state from cell
  const removeIndex = Math.floor(Math.random() * cell.state.length)
  cell.state.splice(removeIndex, 1)

  // Propagate change to all other cells around the cell
  wfc.propagateCellChangesStartingFromCell(cell)


  if (cell.entropy === 0) break
}