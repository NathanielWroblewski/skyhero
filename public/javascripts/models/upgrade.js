import Vector from './vector.js'
import Temperature from './temperature.js'
import GameObject from './game_object.js'
import { UPGRADE } from '../constants/object_types.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class Upgrade extends GameObject {
  constructor (params) {
    super(params)

    this._angle = 0
    this.frame = 0
  }

  get type () {
    return UPGRADE
  }

  tick () {
    this.frame++
    this._angle = this._angle + 0.2

    const x = (Math.cos(this._angle) * 5) - 1
    const y = (Math.sin(this._angle) * 5) - 1

    this.position = this.position.add(Vector.from([x, y]))
  }

  get extent () {
    return {
      x: [this.position.x - 30, this.position.x + 30],
      y: [this.position.y - 30, this.position.y + 30]
    }
  }
}

export default Upgrade
