import { MapCell } from "./MapCell"
import { Vector } from "matter-js"

export const generateLevel = (width = 64, height = 48) => {
  const level: MapCell[][] | undefined[][] = []
  for (let x = 0; x < width; x++) {
    level.push([])
    for (let y = 0; y < height; y++) {
      level[x][y] = undefined
    }
  }

  let rooms = 0

  makeRoom(level)

  return level
}

const makeRoom = (grid: MapCell[][] | undefined[][], entry = { x: 0, y: 0 }) => {
  let width = 0
  while (width == 0) {
    const prop = Math.max(Math.random() > 0.5 ? Math.floor(Math.random() * grid.length * 0.5) + 2 : Math.floor(Math.random() * grid.length * 0.2), 3)
    if (entry.x + prop < grid.length) {
      width = prop
    }
  }

  let height = 0
  while (height == 0) {
    const prop = Math.max(Math.random() > 0.6 ? Math.floor(Math.random() * grid[0].length * 0.3) + 2 : Math.floor(Math.random() * grid[0].length * 0.1), 3)
    if (entry.x + prop < grid[0].length) {
      height = prop
    }
  }

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      grid[entry.x + x][entry.y + y] = new MapCell({
        x: entry.x + x,
        y: entry.y + y,
        passable: false,
        fovBlocking: true
      })
    }
  }
}
