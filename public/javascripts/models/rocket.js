import GameObject from './game_object.js'
import { ROCKET } from '../constants/object_types.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const RADIUS = 6

class Rocket extends GameObject {
  constructor (params) {
    super(params)

    this.frame = 0
  }

  get radius () {
    return RADIUS
  }

  get type () {
    return ROCKET
  }

  get extent () {
    return {
      x: [this.position.x - RADIUS, this.position.x + RADIUS],
      y: [this.position.y - RADIUS, this.position.y + RADIUS],
    }
  }

  tick () {
    this.position = this.position.add(this.velocity)

    this.frame++
  }
}

export default Rocket
