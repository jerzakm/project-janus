import { Graphics, Container, Text } from "pixi.js"
import { stage } from "../engine/renderer"

let debugLayerContainer: undefined | Container
export let debugLayerG: Graphics
export let debugGeneralText: Text
export const debugLayerOptions = {
  grid: false
}

export const initDebugLayer = () => {
  debugLayerContainer = new Container()
  debugLayerG = new Graphics()
  debugGeneralText = new Text(`label`, { fill: '#ffffff', fontSize: 12, background: '#000000' })
  debugGeneralText.position.x = 400
  debugGeneralText.position.y = 50

  debugLayerContainer.addChild(debugLayerG)
  debugLayerContainer.addChild(debugGeneralText)
  stage.addChild(debugLayerContainer)
}

export const updateDebugLayer = () => {
  debugLayerG.clear()
}