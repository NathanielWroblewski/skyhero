import Manned from './manned.js'
import { STRAIGHT } from '../constants/yoke_states.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class Aircraft extends Manned {
  get yokeState () {
    return STRAIGHT
  }

  get extent () {
    return {
      x: [this.position.x - 34, this.position.x + 34],
      y: [this.position.y - 36, this.position.y + 36],
    }
  }
}

export default Aircraft
