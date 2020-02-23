import Damage from './damage.js'
import { SMOKE } from '../constants/object_types.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const MAX_FRAMES = 5

class Smoke extends Damage {
  get type () {
    return SMOKE
  }

  get isOver () {
    return this.animation >= MAX_FRAMES
  }
}

export default Smoke
