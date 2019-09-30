import { initRenderer, renderer, ticker, stage } from "./engine/renderer"
import * as Stats from 'stats.js'
import { loadAssets } from "./engine/loader"
import './_scss/main.scss'
import { UPDATE_PRIORITY, Graphics, Container, Sprite, Loader } from "pixi.js"
import { initPhysics, world, engine } from "./engine/physics"
import { initControlls, playerData } from "./controlls.ts/keyboard"
import { Vector, Body, World, Engine, Grid } from "matter-js"
import { MAP_CELL_SIZE } from "./engine/constants"
import { CellularAutomataCave } from "./map/CellularAutomataCave"
import { initDebugLayer, debugGeneralText } from "./debug/debugLayer"

start()

const loader = Loader.shared;

async function start() {
    initRenderer()
    await loadAssets()
    initPhysics()
    initControlls()
    test()
    initDebugLayer()
}

let stats = new Stats.default()
stats.showPanel(0)
document.body.appendChild(stats.dom)
stats.dom.style.left = 'auto'
stats.dom.style.right = '0'


function test() {
    const g = new Graphics()
    const groundContainer = new Container()
    stage.addChild(groundContainer)
    stage.addChild(g)

    const automata = new CellularAutomataCave()
    automata.maxIterations = 3
    automata.width = 55
    automata.height = 30
    const cave = automata.generateFullGrid()
    automata.cleanStrays(5)

    for (let x = 0; x < cave.length; x++) {
        for (let y = 0; y < cave[0].length; y++) {
            if (!cave[x][y]) {
                const sprite = Sprite.from(loader.resources['dirt'].texture)
                sprite.x = x * MAP_CELL_SIZE
                sprite.y = y * MAP_CELL_SIZE

                sprite.scale.x = MAP_CELL_SIZE / sprite.width
                sprite.scale.y = MAP_CELL_SIZE / sprite.height
                groundContainer.addChild(sprite)
            }
        }
    }


    ticker.add((delta) => {
        stats.begin()
        g.clear()

        g.beginFill(0x322222)
        for (let x = 0; x < cave.length; x++) {
            for (let y = 0; y < cave[0].length; y++) {
                cave[x][y] ? g.drawRect(x * MAP_CELL_SIZE, y * MAP_CELL_SIZE, MAP_CELL_SIZE, MAP_CELL_SIZE) : false
            }
        }
        g.endFill()
        stats.end()
    })

}