export interface ICellularAutomataCaveOptions {
  width: number
  height: number
  spawnRate: number
  survivalTreshold: number
  birthTreshhold: number
}

export class CellularAutomataCave {

  private initialGrid: boolean[][] = []
  private currentGrid: boolean[][] = []
  private newGrid: boolean[][] = []


  width: number = 96
  height: number = 48
  spawnRate: number = 0.4
  survivalTreshold: number = 4
  birthTreshhold: number = 4

  stepsPerFrame: number = this.width * this.height
  maxIterations: number = 16

  private stepX: number = 0
  private stepY: number = 0
  iterationsCount: number = 0

  constructor(options?: ICellularAutomataCaveOptions) {
    if (options) {
      const { width, height, spawnRate, survivalTreshold, birthTreshhold } = options
      this.width = width
      this.height = height
      this.spawnRate = spawnRate
      this.survivalTreshold = survivalTreshold
      this.birthTreshhold = birthTreshhold
    }
  }

  private initializeArrays = () => {
    for (let x = 0; x < this.width; x++) {
      this.initialGrid[x] = []
      this.currentGrid[x] = []
      this.newGrid[x] = []
      for (let y = 0; y < this.height; y++) {
        this.currentGrid[x][y] = Math.random() >= this.spawnRate ? true : false
        this.newGrid[x][y] = this.currentGrid[x][y]
        this.initialGrid[x][y] = this.currentGrid[x][y]
      }
    }
  }

  private isOffGrid = (x: number, y: number) => {
    return x > this.width - 1 || x < 0 || y > this.height - 1 || y < 0 ? true : false
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
    if (this.stepY < this.height) {
      this.calculateNewCellValue(this.stepX, this.stepY)
      this.stepX++
      if (this.stepX == this.width) {
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
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.currentGrid[x][y] = this.newGrid[x][y]
      }
    }
  }

  public generateFullGrid = () => {
    this.initializeArrays()
    while (this.iterationsCount < this.maxIterations) {
      this.makeStep()
    }
    return this.newGrid
  }

  public generateStep = () => {
    let finished = this.iterationsCount < this.maxIterations ? false : true
    let stepCount = 0
    while (stepCount < this.width * this.height) {
      this.makeStep()
      stepCount++
    }

    return { finished, grid: this.newGrid }
  }

  public cleanStrays = (neighbours: number) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const values = this.neighbourValues(x, y)
        let count = 0
        values.map(v => v ? count++ : null)
        if (count < neighbours) {
          this.newGrid[x][y] = false
        }
      }
    }
  }
}