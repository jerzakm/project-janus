import { Body, Bodies } from "matter-js";
import { MAP_CELL_SIZE } from "../engine/constants";

export class MapCell {
  physicsBody: Body
  passable: boolean
  fovBlocking: boolean

  constructor(options: MapCellOptions) {
    this.physicsBody = Bodies.rectangle(options.x * MAP_CELL_SIZE, options.y * MAP_CELL_SIZE, MAP_CELL_SIZE, MAP_CELL_SIZE)
    Body.setStatic(this.physicsBody, true)
    this.passable = options.passable
    this.fovBlocking = options.fovBlocking
  }
}

interface MapCellOptions {
  x: number
  y: number
  passable: boolean
  fovBlocking: boolean
}