import Vector from './vector.js'
import Armored from './armored.js'
import { STRAIGHT } from '../constants/yoke_states.js'
import { UP, DOWN, LEFT, RIGHT } from '../constants/keys.js'
import { BUNKER } from '../constants/object_types.js'
import { WIDTH, HEIGHT } from '../constants/boundaries.js'
import { sample, shuffle, angle } from '../utilities/index.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

// TODO: Make a Turret class?
class Bunker extends Armored {
  get type () {
    return BUNKER
  }

  collide () {
    this.hp ? this.hp-- : this.holdfire()
  }

  tick (players) {
    const player = sample(players)

    this.position = this.position.add(this.velocity)

    player && this.hp ?
      this.turretAngle = angle(this.position, player.position) - 90 :
      this.holdfire()

    if (this.firing) this.temperature.tick()
  }

  get extent () {
    return {
      x: [this.position.x - 10, this.position.x + 10],
      y: [this.position.y - 10, this.position.y + 10],
    }
  }

  static spawn ({ speed = 0.5, firing = true, hp = 15 }) {
    const [position, velocity] = this.randomStart()
    const temperature = Math.floor(Math.random() * 100) + 1

    return new this({
      position,
      velocity,
      temperature,
      firing,
      speed,
      hp
    })
  }

  static randomStart () {
    return [
      Vector.from([(Math.random() * (WIDTH - 200)) + 100, -40]),
      Vector.from([0, 0.5]),
    ]
  }

  static wave ({ objects, difficulty }) {
    return [this.spawn({ hp: 7 })]
  }
}

export default Bunker
