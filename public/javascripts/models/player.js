import Vector from './vector.js'
import Aircraft from './aircraft.js'
import { HALF_PLANE_WIDTH, HALF_PLANE_HEIGHT } from '../constants/dimensions.js'
import { STRAIGHT, YOKE_LEFT, YOKE_RIGHT } from '../constants/yoke_states.js'
import { UP, DOWN, LEFT, RIGHT } from '../constants/keys.js'
import { PLAYER } from '../constants/object_types.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class Player extends Aircraft {
  get type () {
    return PLAYER
  }

  move (directions) {
    if (directions[UP]) {
      this.velocity = Vector.from([this.velocity.x, -this.speed])
    } else if (directions[DOWN]) {
      this.velocity = Vector.from([this.velocity.x, this.speed])
    }

    if (directions[LEFT]) {
      this.velocity = Vector.from([-this.speed, this.velocity.y])
    } else if (directions[RIGHT]) {
      this.velocity = Vector.from([this.speed, this.velocity.y])
    }
  }

  stop (directions) {
    if (!directions[UP] && !directions[DOWN]) {
      this.velocity = Vector.from([this.velocity.x, 0])
    }

    if (!directions[LEFT] && !directions[RIGHT]) {
      this.velocity = Vector.from([0, this.velocity.y])
    }
  }

  // TODO: move out into game objects
  bound (width, height, offset) {
    const offsetHalfWidth = HALF_PLANE_WIDTH + offset
    const offsetHalfHeight = HALF_PLANE_HEIGHT + offset

    if (this.position.x < offsetHalfWidth) {
      this.position = Vector.from([offsetHalfWidth, this.position.y])
    }
    if (this.position.x > (height - offsetHalfHeight)) {
      this.position = Vector.from([height - offsetHalfHeight, this.position.y])
    }
    if (this.position.y < offsetHalfWidth) {
      this.position = Vector.from([this.position.x, offsetHalfWidth])
    }
    if (this.position.y > (height - offsetHalfHeight)) {
      this.position = Vector.from([this.position.x, height - offsetHalfHeight])
    }
  }

  get yokeState () {
    if (this.velocity.x < 0) return YOKE_LEFT
    if (this.velocity.x > 0) return YOKE_RIGHT

    return STRAIGHT
  }

  get extent () {
    return {
      x: [this.position.x - 8, this.position.x + 8],
      y: [this.position.y - 20, this.position.y + 20],
    }
  }
}

export default Player
