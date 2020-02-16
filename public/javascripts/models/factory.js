import Vector from './vector.js'
import Fronds from './tree.js'
import Bandit from './bandit.js'
import { WIDTH } from '../constants/boundaries.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const sample = (min, max) => Math.floor(Math.random() * max) + min

class Factory {
  constructor (params = {}) {
    this.model = params.model
    this.freq = [params.frequencyMin, params.frequencyMax]
    this.x = [params.xMin, params.xMax]
    this.y = [params.yMin, params.yMax]
    this.dx = [params.dxMin, params.dxMax]
    this.dy = [params.dyMin, params.dyMax]
  }

  get frequency () {
    const [min, max] = this.freq

    return sample(min, max)
  }

  get position () {
    const [xmin, xmax] = this.x
    const [ymin, ymax] = this.y

    return Vector.from([sample(xmin, xmax), sample(ymin, ymax)])
  }

  get velocity () {
    const [xmin, xmax] = this.dx
    const [ymin, ymax] = this.dy

    return Vector.from([sample(xmin, xmax), sample(ymin, ymax)])
  }

  seed ({ x: [xmin, xmax], y: [ymin, ymax] }) {
    const position = Vector.from([sample(xmin, xmax), sample(ymin, ymax)])

    return new this.model({ position, velocity: this.velocity })
  }

  spawn () {
    if (Math.random() < this.frequency) {
      return this.seed({ x: this.x, y: this.y })
    }
  }

  static kamikazi (count) {
    return new Array(count).fill(0).map(() => {
      return Bandit({

      })
    })
  }

  static tree () {
    return new Factory({
      model: Fronds,
      frequencyMin: 0.03,
      frequencyMax: 0.045,
      xMin: 0,
      xMax: WIDTH,
      yMin: -80,
      yMax: -80,
      dxMin: 0,
      dxMax: 0,
      dyMin: 0.5,
      dyMax: 0.5,
    })
  }
}

export default Factory
