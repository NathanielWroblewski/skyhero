import Vector from './vector.js'
import { WIDTH, HEIGHT } from '../constants/boundaries.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class GameObject {
  constructor ({ position, velocity, staged = false }) {
    this.position = position
    this.velocity = velocity
    this.isStaged = staged
    this.collision = false
  }

  tick () {
    if (this.inBounds && this.isStaged) this.isStaged = false

    this.position = this.position.add(this.velocity)
  }

  collide () {
    this.collision = true
  }

  get inBounds () {
    const [x, y] = this.position

    return x >= 0 && x <= WIDTH && y >= 0 && y <= HEIGHT
  }

  static stage (position, offset, index) {
    const [x, y] = position

    if (x < 0) return position.subtract(Vector.from([offset * index, 0]))
    if (x > WIDTH) return position.add(Vector.from([offset * index, 0]))

    return position.subtract(Vector.from([0, offset * index]))
  }

  static randomStart (speed) {
    const seed = Math.random()
    const placement = Math.random()

    if (seed < 0.25) { // enter left
      const position = Vector.from([-5, Math.floor(Math.random() * HEIGHT)])
      const velocity = Vector.from([speed, 0])

      return [position, velocity]
    }
    if (seed > 0.75) { // enter right
      const position = Vector.from([WIDTH + 5, Math.floor(Math.random() * HEIGHT)])
      const velocity = Vector.from([-speed, 0])

      return [position, velocity]
    }

    return [
      Vector.from([Math.floor(placement * WIDTH), -10]),
      Vector.from([0, speed]),
    ]
  }

  static spawn (params = {}) {
    const [position, velocity] = this.randomStart(params.speed)

    return new this({ position, velocity, ...params })
  }
}

export default GameObject
