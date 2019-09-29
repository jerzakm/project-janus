import { Graphics } from "pixi.js"

export let debugLayerG: Graphics
export const debugLayerOptions = {
  grid: false
}

export const initDebugLayer = () => {
  debugLayerG = new Graphics()
}

export const updateDebugLayer = () => {
  debugLayerG.clear()
}