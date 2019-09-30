import { Loader } from "pixi.js";

const loader = Loader.shared;

export const loadAssets = () => {
  return new Promise((resolve, reject) => {
    try {
      loader
        .add('ground', 'ground.png')
        .add('dirt', 'dirt.png')
        .load(() => {
          resolve()
        })
    } catch (e) {
      console.log(e)
    }
  });
}