interface ICellularAutomataCaveOptions {
  width: number
  height: number
}

export class CellularAutomataCave {

  private initialGrid: boolean[][] = []
  private currentGrid: boolean[][] = []
  private newGrid: boolean[][] = []

  gridSize: number = 128
  spawnRate: number = 0.4
  survivalTreshold: number = 4
  birthTreshhold: number = 4

  stepsPerFrame: number = this.gridSize ** 2
  maxIterations: number = 6

  private stepX: number = 0
  private stepY: number = 0
  private iterationsCount: number = 0

  constructor() {
    this.initializeArrays()
  }

  private initializeArrays = () => {
    for (let x = 0; x < this.gridSize; x++) {
      this.initialGrid[x] = []
      this.currentGrid[x] = []
      this.newGrid[x] = []
      for (let y = 0; y < this.gridSize; y++) {
        this.currentGrid[x][y] = Math.random() >= this.spawnRate ? true : false
        this.newGrid[x][y] = this.currentGrid[x][y]
        this.initialGrid[x][y] = this.currentGrid[x][y]
      }
    }
  }

  private isOffGrid = (x: number, y: number) => {
    return x > this.gridSize - 1 || x < 0 || y > this.gridSize - 1 || y < 0 ? true : false
  }

  private neighbourValues = (x: number, y: number, radius?: number) => {
    const neighbourValues: boolean[] = []

    neighbourValues.push(
      //values out of bound are alive (walls)
      this.isOffGrid(x - 1, y - 1) ? true : this.currentGrid[x - 1][y - 1],
      this.isOffGrid(x - 1, y) ? true : this.currentGrid[x - 1][y],
      this.isOffGrid(x - 1, y + 1) ? true : this.currentGrid[x - 1][y + 1],
      this.isOffGrid(x, y - 1) ? true : this.currentGrid[x][y - 1],
      this.isOffGrid(x, y + 1) ? true : this.currentGrid[x][y + 1],
      this.isOffGrid(x + 1, y - 1) ? true : this.currentGrid[x + 1][y - 1],
      this.isOffGrid(x + 1, y) ? true : this.currentGrid[x + 1][y],
      this.isOffGrid(x + 1, y + 1) ? true : this.currentGrid[x + 1][y + 1],
    )

    return neighbourValues
  }

  private calculateNewCellValue = (x: number, y: number) => {
    const vals = this.neighbourValues(x, y)
    let count = 0

    vals.map(v => v ? count++ : null)
    count > this.survivalTreshold ? this.newGrid[x][y] = true : this.newGrid[x][y] = false
    count > this.birthTreshhold && !this.currentGrid[x][y] ? this.newGrid[x][y] = true : null
  }

  private makeStep = () => {
    if (this.stepY < this.gridSize) {
      this.calculateNewCellValue(this.stepX, this.stepY)
      this.stepX++
      if (this.stepX == this.gridSize) {
        this.stepX = 0
        this.stepY++
      }
    } else {
      this.reassignGrids()
      this.stepX = 0
      this.stepY = 0
      this.iterationsCount++
    }
  }

  private reassignGrids = () => {
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        this.currentGrid[x][y] = this.newGrid[x][y]
      }
    }
  }

  public generateFullGrid = () => {
    this.initializeArrays()
    let stepCount = 0
    while (stepCount < this.stepsPerFrame && this.iterationsCount < this.maxIterations) {
      this.makeStep()
      stepCount++
    }
    return this.newGrid
  }

  public generateStep = () => {
    let finished = this.iterationsCount < this.maxIterations ? false : true

    return { finished, grid: this.newGrid }
  }
}