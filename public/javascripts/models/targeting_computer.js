import Vector from './vector.js'
import { HALF_PLANE_WIDTH, HALF_PLANE_HEIGHT } from '../constants/dimensions.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class TargetingComputer {
  static computeX (position, target, speed) {
    if (target.x < (position.x - HALF_PLANE_WIDTH)) return -speed
    if (target.x > (position.x + HALF_PLANE_WIDTH)) return speed
    return 0
  }

  static computeY (position, target, speed) {
    if (target.y < (position.y - HALF_PLANE_HEIGHT)) return -speed
    if (target.y > (position.y + HALF_PLANE_HEIGHT)) return speed
    return 0
  }

  static computeVelocity (position, target, speed) {
    return Vector.from([
      this.computeX(position, target, speed),
      this.computeY(position, target, speed)
    ])
  }

  static recomputeVelocity (self, target, speed) {
    const newVelocity = this.computeVelocity(self.position, target.position, speed)
    const change = newVelocity.reduce((memo, element, index) => {
      return memo += Math.abs(element - self.velocity[index])
    }, 0)

    return change <= 1 ? newVelocity : self.velocity
  }
}

export default TargetingComputer
