import GameObject from './game_object.js'
import { BULLET } from '../constants/object_types.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const SPREADS = [15, 23, 31]

class Bullet extends GameObject {
  constructor (params = {}) {
    super(params)

    this.weapons = params.weapons || 0
  }

  get spreads () {
    return SPREADS
  }

  get spread () {
    return SPREADS[Math.min(this.weapons, 2)]
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
