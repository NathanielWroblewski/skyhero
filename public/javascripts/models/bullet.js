import GameObject from './game_object.js'
import { BULLET } from '../constants/object_types.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const SPREADS = [15, 20, 25, 30]

class Bullet extends GameObject {
  constructor (params = {}) {
    super(params)

    this.weapons = params.weapons || 0
  }

  get spread () {
    return SPREADS[Math.min(this.weapons, 3)]
  }

  get type () {
    return BULLET
  }

  get extent () {
    return {
      x: [this.position.x - this.spread, this.position.x + this.spread],
      y: [this.position.y - 10, this.position.y + 10],
    }
  }
}

export default Bullet
