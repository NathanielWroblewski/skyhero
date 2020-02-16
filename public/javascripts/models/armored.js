import Manned from './manned.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class Armored extends Manned {
  constructor (params = {}) {
    super(params)

    this.hp = params.hp || 5
  }

  collide () {
    this.hp ? this.hp-- : this.collision = true
  }
}

export default Armored
