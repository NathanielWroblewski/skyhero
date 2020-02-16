import GameObject from './game_object.js'
import { DAMAGE } from '../constants/object_types.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const MAX_FRAMES = 7

class Damage extends GameObject {
  constructor (params) {
    super(params)

    this.animation = 0
    this.animationCooldown = 0
  }

  get type () {
    return DAMAGE
  }

  tick () {
    this.animationCooldown++

    if (this.animationCooldown % 3 === 0) {
      this.animation++
    }
  }

  get isOver () {
    return this.animation >= MAX_FRAMES
  }
}

export default Damage
