import Vector from './vector.js'
import Manned from './manned.js'
import { STRAIGHT } from '../constants/yoke_states.js'
import { UP, DOWN, LEFT, RIGHT } from '../constants/keys.js'
import { PANZER } from '../constants/object_types.js'
import { WIDTH, HEIGHT } from '../constants/boundaries.js'
import { sample, shuffle, angle } from '../utilities/index.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const angleTurret = (position, lastPosition, players) => {
  const player = sample(players)

  if (!player) return angleBody(lastPosition)

  return angle(position, player.position) // - 90 in view
}

class Panzer extends Manned {
  constructor (params) {
    super(params)

    this.lastVelocity = params.velocity
    this.turretAngle = 0
  }

  get type () {
    return PANZER
  }

  getBodyAngle () {
    const [x, y] = this.lastVelocity

    if (x > 0 && y === 0) return 45
    if (x < 0 && y === 0) return -45
    if (x > 0 && y === 0.5) return 90
    if (x < 0 && y === 0.5) return -90
    if (x > 0 && y === 1) return 135
    if (x < 0 && y === 1) return -135

    return 180
  }

  tick (players) {
    if (this.inBounds) {
      this.isStaged = false
      this.fire()
    }

    this.position = this.position.add(this.velocity)

    const player = sample(players)
    player ? this.turretAngle = angle(this.position, player.position) - 90 : this.holdfire()

    if (this.velocity.x !== 0 || this.velocity.y !== 0.5) { // not stopped
      this.lastVelocity = this.velocity
    }

    if (this.firing) this.temperature.tick()
  }

  get extent () {
    return {
      x: [this.position.x - 30, this.position.x + 30],
      y: [this.position.y - 30, this.position.y + 30],
    }
  }

  static spawn ({ speed = 0.5, left = true }) {
    const [position, velocity] = this.randomStart(speed, left)
    const temperature = Math.floor(Math.random() * 100) + 1

    return new this({
      position,
      speed,
      velocity,
      temperature
    })
  }

  static randomStart (speed, left) {
    const seed = Math.random()

    if (left) {
      const position = Vector.from([-30, Math.floor(Math.random() * HEIGHT)])
      const velocity = seed > 0.66 ?
        Vector.from([speed, 0]) : (seed > 0.33 ? Vector.from([speed, 0.5]) : Vector.from([speed, 1]))

      return [position, velocity]
    }

    const position = Vector.from([WIDTH + 30, Math.floor(Math.random() * HEIGHT)])
    const velocity = seed > 0.66 ?
      Vector.from([-speed, 0]) : (seed > 0.33 ? Vector.from([-speed, 0.5]) : Vector.from([-speed, 1]))

    return [position, velocity]
  }

  // clean this up
  static wave ({ objects, difficulty }) {
    if (objects.panzers.length) return []

    const speed = 0.5
    const descent = 0.5
    const segments = new Array(difficulty).fill(0).map((_, index) => index)
    const side = Math.random() < 0.5 ? -1 : 1

    if (Math.random() < 0.5) { // staged column or row, e.g. X X X headed left
      if (Math.random() < 0.5) { // top
        const velocity = Vector.from([0, speed + descent])
        const position = Vector.from([
          (Math.random() * WIDTH / difficulty) + (segments[0] * WIDTH / difficulty), -30
        ])

        return segments.map((_, index) => {
          return new this({ position: this.stage(position, 100, index), velocity, staged: true, speed })
        })
      } else { // side
        const velocity = Vector.from([side * speed, descent])
        const position = Vector.from([
          side < 0 ? WIDTH + 30 : -30, (Math.random() * HEIGHT / difficulty) + (segments[0] * HEIGHT / difficulty)
        ])

        return segments.map((_, index) => {
          return new this({ position: this.stage(position, 100, index), velocity, staged: true, speed })
        })
      }
    } else { // column or row, e.g.  X X X headed down
      if (Math.random() < 0.5) { // top
        const offset = Math.random() * WIDTH / difficulty // uniform offset prevents overlap

        return shuffle(segments).map(index => {
          const velocity = Vector.from([0, speed + descent])
          const position = Vector.from([
            offset + (index * WIDTH / difficulty), -30
          ])

          return new this({ position, velocity, speed })
        })
      } else { // left or right
        const offset = Math.random() * HEIGHT / difficulty

        return shuffle(segments).map(index => {
          const velocity = Vector.from([side * speed, descent])
          const position = Vector.from([
            side < 0 ? WIDTH + 30 : -30, offset + (index * HEIGHT / difficulty)
          ])

          return new this({ position, velocity, speed })
        })
      }
    }
  }
}

export default Panzer
