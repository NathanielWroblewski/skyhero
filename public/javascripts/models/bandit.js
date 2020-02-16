import Vector from './vector.js'
import Aircraft from './aircraft.js'
import NavComputer from './navcomputer.js'
import { BANDIT } from '../constants/object_types.js'
import { WIDTH, HEIGHT } from '../constants/boundaries.js'
import { sample } from '../utilities/index.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const CLASSIFICATIONS = ['02', '03', '04', '05']

class Bandit extends Aircraft {
  constructor (params) {
    super(params)

    this.classification = params.classification || sample(CLASSIFICATIONS)
    this.navComputer = params.route || NavComputer.planRoute()
  }

  get type () {
    return BANDIT
  }

  tick (players) {
    if (this.inBounds && this.isStaged) this.isStaged = false

    this.navComputer.tick()
    this.velocity = this.navComputer.courseCorrect(this)
    this.position = this.position.add(this.velocity)

    if (this.firing) this.temperature.tick()
  }

  static formation () {
    const classification = sample(CLASSIFICATIONS.slice(1, 3))
    const route = sample(['R', 'O', 'N', 'helix'])
    const speed = 5
    let position, velocity

    switch (route) {
      case 'O':
        position = Vector.from([-30, Math.floor(HEIGHT / 8)])
        velocity = Vector.from([speed, 0])

        return new Array(8).fill(0).map((element, index) => {
          return new this({
            position: this.stage(position, 100, index),
            velocity,
            classification,
            route: new NavComputer({ route: 'O' }),
            speed,
            staged: true
          })
        })
      case 'N':
        position = Vector.from([WIDTH + 30, Math.floor(7 * HEIGHT / 8)])
        velocity = Vector.from([-speed, 0])

        return new Array(8).fill(0).map((element, index) => {
          return new this({
            position: this.stage(position, 100, index),
            velocity,
            classification,
            route: new NavComputer({ route: 'N' }),
            speed,
            staged: true
          })
        })
      case 'R':
        position = Vector.from([WIDTH + 30, Math.floor(7 * HEIGHT / 8)])
        velocity = Vector.from([-speed, 0])

        return new Array(8).fill(0).map((element, index) => {
          return new this({
            position: this.stage(position, 100, index),
            velocity,
            classification,
            route: new NavComputer({ route: 'R' }),
            speed,
            staged: true
          })
        })
      case 'helix':
        const left = Vector.from([2 * WIDTH / 8, HEIGHT + 30])
        const right = Vector.from([6 * WIDTH / 8, HEIGHT + 30])
        velocity = Vector.from([0, -speed])

        const helix = []

        new Array(8).fill(0).map((element, index) => {
          helix.push(new this({
            position: this.stage(left, -100, index),
            velocity,
            classification,
            route: new NavComputer({ route: 'leftHelixUp' }),
            speed,
            staged: true
          }))
          helix.push(new this({
            position: this.stage(right, -100, index),
            velocity,
            classification,
            route: new NavComputer({ route: 'rightHelixUp' }),
            speed,
            staged: true
          }))
        })

        return helix
    }
  }
}

export default Bandit
