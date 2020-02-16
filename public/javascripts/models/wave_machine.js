import Temperature from './temperature.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class WaveMachine {
  constructor ({ temperature = 1, cooldown = 1500, waves = 1 }) {
    this.rest = new Temperature({ temperature, cooldown })
    this.waves = waves
  }

  ratchet () {
    this.waves++
  }

  get isReady () {
    return this.rest.hasCooledDown
  }

  launch (fn) {
    if (this.isReady) {
      fn()
    }
  }

  tick () {
    this.rest.tick()
  }
}

export default WaveMachine
