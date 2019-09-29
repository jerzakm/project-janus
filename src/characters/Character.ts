import { Body, Bodies } from "matter-js";

export class Character {
  physicsBody: Body

  constructor() {
    this.physicsBody = Bodies.rectangle(400, 500, 50, 50)
  }
}