import { Renderer, Ticker, Container, UPDATE_PRIORITY, settings, SCALE_MODES } from 'pixi.js'

export let renderer: Renderer
export let ticker = Ticker.shared
export let stage: Container


export function initRenderer() {
  renderer = new Renderer(
    {
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xAAAAAA,
      forceFXAA: false,
      antialias: false,
      powerPreference: 'high-performance'
    }
  )

  ticker = new Ticker()
  ticker.maxFPS = 144

  stage = new Container();

  ticker.add(() => {
    renderer.render(stage)
  }, UPDATE_PRIORITY.NORMAL)

  ticker.start()

  document.body.appendChild(renderer.view)
  settings.SCALE_MODE = SCALE_MODES.NEAREST
}
