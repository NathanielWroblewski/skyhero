import GameObject from './game_object.js'
import { FRONDS } from '../constants/object_types.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class Tree extends GameObject {
  constructor (props = {}) {
    super(props)

    this.classification = props.classification || Math.round(Math.random())
  }

  get type () {
    return FRONDS
  }
}

export default Tree
