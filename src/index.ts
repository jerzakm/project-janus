import { initRenderer, renderer, ticker, stage } from "./engine/renderer"
import * as Stats from 'stats.js'
import { loadAssets } from "./engine/loader"
import './_scss/main.scss'
import { UPDATE_PRIORITY, Graphics } from "pixi.js"
import { initPhysics, world, engine } from "./engine/physics"
import { Character } from "./characters/Character"
import { initControlls, playerData } from "./controlls.ts/keyboard"
import { Vector, Body, World, Engine } from "matter-js"
import { generateLevel } from "./map/levelGenerator"
import { MAP_CELL_SIZE } from "./engine/constants"

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


function test() {

    // const char = new Character()
    const g = new Graphics()
    stage.addChild(g)
    // World.add(world, char.physicsBody)

    const map = generateLevel(128, 128)

    ticker.add((delta) => {
        stats.begin()
        Engine.update(engine, delta)
        g.clear()
        for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map[x].length; y++) {
                if (map[x][y]) {
                    g.beginFill(0xAAAAAA)
                    g.drawRect(x * MAP_CELL_SIZE, y * MAP_CELL_SIZE, MAP_CELL_SIZE, MAP_CELL_SIZE)
                    g.endFill()
                } else {
                    g.beginFill(0x222222)
                    g.drawRect(x * MAP_CELL_SIZE, y * MAP_CELL_SIZE, MAP_CELL_SIZE, MAP_CELL_SIZE)
                    g.endFill()
                }
            }
        }
        // g.beginFill(0x999999)
        // g.drawRect(0, 0, 1920, 1080)
        // g.endFill()
        // const poly: number[] = []
        // char.physicsBody.vertices.map(v => poly.push(v.x, v.y))
        // g.beginFill(0x121212)
        // g.drawPolygon(poly)
        // g.endFill()

        // const maxVelocity = 12
        // const moveVector = Vector.mult(Vector.normalise(playerData.moving), maxVelocity)
        // Body.setVelocity(char.physicsBody, moveVector)

        stats.end()
    })
}