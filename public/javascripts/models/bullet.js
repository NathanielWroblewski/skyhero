import GameObject from './game_object.js'
import { BULLET } from '../constants/object_types.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class Bullet extends GameObject {
  get type () {
    return BULLET
  }

  get extent () {
    return {
      x: [this.position.x - 15, this.position.x + 15],
      y: [this.position.y - 10, this.position.y + 10],
    }
  }
}

export default Bullet
