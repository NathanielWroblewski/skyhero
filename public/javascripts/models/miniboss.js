import Vector from './vector.js'
import Armored from './armored.js'
import { MINIBOSS } from '../constants/object_types.js'
import { WIDTH, HEIGHT } from '../constants/boundaries.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class MiniBoss extends Armored {
  constructor (params) {
    super(params)

    this.turretAngle = 0
    this.turretDirection = -1
  }

  get type () {
    return MINIBOSS
  }

  get extent () {
    return {
      x: [this.position.x - 83, this.position.x + 83],
      y: [this.position.y - 12, this.position.y + 12],
    }
  }

  sweep () {
    if (this.turretAngle === 180 || this.turretAngle === 0) {
      this.turretDirection = this.turretDirection * -1
    }

    this.turretAngle = ((this.turretAngle + (20 * this.turretDirection)) % 360)
  }

  tick (players = []) {
    const speedUp = this.position.y > HEIGHT / 8 && this.velocity.y === 1
    const turnRight = this.position.x < WIDTH / 8 && this.velocity.x < 0
    const turnLeft = this.position.x > 7 * WIDTH / 8 && this.velocity.x > 0

    if (this.inBounds && this.isStaged) this.isStaged = false

    if (speedUp) {
      const leftOrRight = Math.random() < 0.5 ? -0.5 : 0.5;

      this.velocity = Vector.from([leftOrRight, 0])
    }

    if (players.length && (turnRight || turnLeft)) {
      const { x, y } = this.velocity

      this.velocity = Vector.from([-x, y])
    }

    this.position = this.position.add(this.velocity)

    if (this.firing) {
      this.temperature.tick()
    }
  }

  static spawn ({ speed = 0.5, firing = true, hp = 12 }) {
    const [position, velocity] = this.randomStart()
    const cooldown = 20
    const temperature = Math.floor(Math.random() * (cooldown / 2)) + 1

    return new this({
      position,
      velocity,
      cooldown,
      temperature,
      firing,
      speed,
      hp
    })
  }

  static randomStart () {
    return [
      Vector.from([(Math.random() * (WIDTH - 200)) + 100, -50]),
      Vector.from([0, 1])
    ]
  }

  static wave ({ objects, round }) {
    return (round > 1 && !objects.minibosses.length) ? [this.spawn({ hp: 12 })] : []
  }
}

export default MiniBoss
