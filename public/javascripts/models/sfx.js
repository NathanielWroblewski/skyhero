import { audioPath } from '../utilities/index.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class SFX {
  constructor (filename) {
    this._sfx = new Audio(audioPath(filename))
  }

  play () {
    this._sfx.pause()
    this._sfx.currentTime = 0
    this._sfx.play()
  }
}

export default SFX
