import { audioPath } from '../utilities/index.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class Soundtrack {
  constructor (element) {
    this._audio = element
  }

  play () {
    this._audio.play()
  }

  credits () {
    this._audio.pause()
    this._audio.setAttribute('src', audioPath('stage-2.mp3'))
    this._audio.loop = false
    this._audio.currentTime = 0
    this.play()
  }
}

export default Soundtrack
