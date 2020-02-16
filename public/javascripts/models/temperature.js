// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class Temperature {
  constructor ({ temperature = 0, cooldown = 100 }) {
    this.temperature = temperature
    this.cooldown = cooldown
  }

  tick (callback) {
    this.temperature = (this.temperature + 1) % this.cooldown
  }

  get hasCooledDown () {
    return this.temperature === 0
  }

  set (value) {
    this.temperature = value
  }

  setCooldown (value) {
    this.cooldown = value
  }
}

export default Temperature
