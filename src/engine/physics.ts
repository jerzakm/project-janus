import { World, Engine } from "matter-js"

export let engine: Engine
export let world: World

export const initPhysics = () => {
  engine = Engine.create()
  world = engine.world;
  world.gravity.x = 0
  world.gravity.y = 0
}