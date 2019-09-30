import { initRenderer, renderer, ticker, stage } from "./engine/renderer"
import * as Stats from 'stats.js'
import { loadAssets } from "./engine/loader"
import './_scss/main.scss'
import { UPDATE_PRIORITY, Graphics } from "pixi.js"
import { initPhysics, world, engine } from "./engine/physics"
import { Character } from "./characters/Character"
import { initControlls, playerData } from "./controlls.ts/keyboard"
import { Vector, Body, World, Engine, Grid } from "matter-js"
import { generateLevel } from "./map/levelGenerator"
import { MAP_CELL_SIZE } from "./engine/constants"
import { CellularAutomataCave } from "./map/CellularAutomataCave"

start()

function start() {
    loadAssets()
    initRenderer()
    initPhysics()
    initControlls()
    test()
}

let stats = new Stats.default()
stats.showPanel(0)
document.body.appendChild(stats.dom)
stats.dom.style.left = 'auto'
stats.dom.style.right = '0'


function test() {
    const g = new Graphics()
    stage.addChild(g)

    const automata = new CellularAutomataCave()
    const cave = automata.generateFullGrid()
    console.log(cave)

    ticker.add((delta) => {
        g.clear()


        g.beginFill(0x661212)
        for (let x = 0; x < cave.length; x++) {
            for (let y = 0; y < cave[0].length; y++) {
                cave[x][y] ? g.drawRect(x * MAP_CELL_SIZE, y * MAP_CELL_SIZE, MAP_CELL_SIZE, MAP_CELL_SIZE) : false
            }
        }
        g.endFill()
    })

}