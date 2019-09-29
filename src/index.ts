import { initRenderer } from "./core/renderer"
import { loadAssets } from "./core/loader"
import './_scss/main.scss'

start()

function start() {
    loadAssets()
    initRenderer()
}