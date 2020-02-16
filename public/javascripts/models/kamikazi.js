import Bandit from './aircraft.js'
import Vector from './vector.js'
import { sample } from '../utilities/index.js'
import { WIDTH } from '../constants/boundaries.js'
import { BANDIT } from '../constants/object_types.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class Kamikazi extends Bandit {
  get classification () {
    return '02'
  }

  get type () {
    return BANDIT
  }

  adjustHeading (players) {
    const player = sample(players)

    if (player) {
      const distance = player.position.subtract(this.position)
      const max = Math.max(...distance.map(value => Math.abs(value)))
      const result = distance.divide(max).multiply(this.speed) //.map(num => Math.round(num))
      const isRetreating = result.y < 2
      const isCrossingCenterline = result.x * this.velocity.x < 0
      const isTurningHard = result.x + this.velocity.x > 2
      const stayCourse = isRetreating || (isCrossingCenterline && isTurningHard)

      return stayCourse ? this.velocity : result
    } else {
      return Vector.from([0, this.speed])
    }
  }

  tick (players) {
    if (this.inBounds && this.isStaged) this.isStaged = false

    this.velocity = this.adjustHeading(players)
    this.position = this.position.add(this.velocity)

    if (this.firing) this.temperature.tick()
  }

  static randomStart (speed) {
    return [
      Vector.from([Math.floor(Math.random() * WIDTH), -50]),
      Vector.from([0, speed]),
    ]
  }

  static wave () {
    return new Array(2).fill(0).map(() => {
      const speed = 5
      const [position, velocity] = this.randomStart(speed)

      return this.spawn({ position, velocity, speed, offset: Vector.zeroes })
    })
  }
}

export default Kamikazi
