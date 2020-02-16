import Vector from './vector.js'
import Temperature from './temperature.js'
import GameObject from './game_object.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class Manned extends GameObject {
  constructor ({ position, velocity, staged, firing = false, temperature = 0, cooldown = 200, speed }) {
    super({ position, velocity, staged })

    this.speed = speed
    this.firing = firing
    this.temperature = new Temperature({ temperature, cooldown })
  }

  stop () {
    this.velocity = Vector.from([0, 0.5])
  }

  fire () {
    this.firing = true
  }

  holdfire () {
    this.firing = false
    this.temperature.set(0)
  }

  get gunsCooled () {
    return this.temperature.hasCooledDown
  }

  tick () {
    if (this.inBounds && this.isStaged) this.isStaged = false

    this.position = this.position.add(this.velocity)

    if (this.firing) {
      this.temperature.tick()
    }
  }
}

export default Manned
