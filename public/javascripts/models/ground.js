import GameObject from './game_object.js'
import { GROUND } from '../constants/object_types.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class Ground extends GameObject {
  constructor (params) {
    super(params)

    this.variation = params.variation
  }

  get type () {
    return GROUND
  }
}

export default Ground
