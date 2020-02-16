import Vector from './vector.js'
import { HEIGHT, WIDTH } from '../constants/boundaries.js'
import { sample } from '../utilities/index.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const U = 'U'
const I = 'I'
const L = 'L'
const P = 'P'
const Q = 'Q'

const ROUTES = [U, I, L, P, Q]

class NavComputer {
  constructor ({ route, invert = false }) {
    this.route = route || sample(ROUTES)
    this.invert = invert
    this.counter = 0
  }

  directions (velocity) {
    return {
      up:    velocity.y < 0,
      down:  velocity.y > 0,
      left:  velocity.x < 0,
      right: velocity.x > 0
    }
  }

  left (velocity, speed) {
    const { up, down, left, right } = this.directions(velocity)

    if (up && left) return Vector.from([-speed, 0])
    if (up && right) return Vector.from([0, -speed])
    if (down && left) return Vector.from([0, speed])
    if (down && right) return Vector.from([speed, 0])

    if (up) return Vector.from([-speed, -speed])
    if (left) return Vector.from([-speed, speed])
    if (right) return Vector.from([speed, -speed])
    if (down) return Vector.from([speed, speed])

    return velocity
  }

  right (velocity, speed) {
    const { up, down, left, right } = this.directions(velocity)

    if (up && left) return Vector.from([0, -speed])
    if (up && right) return Vector.from([speed, 0])
    if (down && left) return Vector.from([-speed, 0])
    if (down && right) return Vector.from([0, speed])

    if (up) return Vector.from([speed, -speed])
    if (left) return Vector.from([-speed, -speed])
    if (right) return Vector.from([speed, speed])
    if (down) return Vector.from([-speed, speed])

    return velocity
  }

  tick () {
    this.counter++
  }

  courseCorrect ({ position, velocity, speed }) {
    return this[`_${this.route}`]({ position, velocity, speed })
  }

  _U ({ velocity, speed }) {
    switch (this.counter) {
      case 80:
      case 90:
      case 170:
      case 180:
        return this.invert ? this.right(velocity, speed) : this.left(velocity, speed)
      default:
        return velocity
    }
  }

  _I ({ velocity, speed }) {
    return velocity
  }

  _L ({ velocity, speed }) {
    switch (this.counter) {
      case 170:
      case 180:
        return this.invert ? this.right(velocity, speed) : this.left(velocity, speed)
      default:
        return velocity
    }
  }

  _P ({ velocity, speed }) {
    switch (this.counter) {
      case 170:
      case 180:
      case 250:
      case 260:
      case 290:
      case 300:
        return this.invert ? this.right(velocity, speed) : this.left(velocity, speed)
      default:
        return velocity
    }
  }

  _Q ({ velocity, speed }) {
    if (this.counter > 80 && (this.counter % 80 === 0 || this.counter % 80 === 70)) {
      return this.invert ? this.right(velocity, speed) : this.left(velocity, speed)
    }
    return velocity
  }


  //  ^
  // -|----\ const position = Vector.from([-30, Math.floor(HEIGHT / 8)])
  //  |    | const velocity = Vector.from([speed, 0])
  //  \----/
  _O ({ position, velocity, speed }) {
    const [x, y] = position
    const { up, down, left, right } = this.directions(velocity)

    if (right && !down && x > 6 * WIDTH / 8 && y < HEIGHT / 2) {
      return this.right(velocity, speed)
    }

    if (right && down && x > 7 * WIDTH / 8 && y < HEIGHT / 2) {
      return this.right(velocity, speed)
    }

    if (down && !left && x > WIDTH / 2 && y > 6 * HEIGHT / 8) {
      return this.right(velocity, speed)
    }

    if (down && left && x > WIDTH / 2 && y > 7 * HEIGHT / 8) {
      return this.right(velocity, speed)
    }

    if (left && !up && x < 2 * WIDTH / 8 && y > HEIGHT / 2) {
      return this.right(velocity, speed)
    }

    if (left && up && x < WIDTH / 8 && y > HEIGHT / 2) {
      return this.right(velocity, speed)
    }

    return velocity
  }

  //   /----\   const position = Vector.from([WIDTH + 30, Math.floor(7 * HEIGHT / 8)])
  //   |    |   const velocity = Vector.from([-speed, 0])
  // <-/    \-
  _N ({ position, velocity, speed }) {
    const [x, y] = position
    const { up, down, left, right } = this.directions(velocity)

    if (left && !up && x < 7 * WIDTH / 8 && x > WIDTH / 2 && y > HEIGHT / 2) {
      return this.right(velocity, speed)
    }

    if (left && up && x < 6 * WIDTH / 8 && y > HEIGHT / 2) {
      return this.right(velocity, speed)
    }

    if (up && !left && x > WIDTH / 2 && y < 2 * HEIGHT / 8) {
      return this.left(velocity, speed)
    }

    if (up && left && x > WIDTH / 2 && y < HEIGHT / 8) {
      return this.left(velocity, speed)
    }

    if (left && !down && x < 3 * WIDTH / 8 && y < HEIGHT / 2) {
      return this.left(velocity, speed)
    }

    if (left && down && x < 2 * WIDTH / 8 && y < HEIGHT / 2) {
      return this.left(velocity, speed)
    }

    if (down && !left && x < WIDTH / 2 && y > 6 * HEIGHT / 8) {
      return this.right(velocity, speed)
    }

    if (down && left && x < WIDTH / 2 && y > 7 * HEIGHT / 8) {
      return this.right(velocity, speed)
    }

    return velocity
  }

  //   /-\   const position = Vector.from([WIDTH + 30, Math.floor(7 * HEIGHT / 8)])
  //   \ |   const velocity = Vector.from([-speed, 0])
  //    \ \-
  _R ({ position, velocity, speed }) {
    const [x, y] = position
    const { up, down, left, right } = this.directions(velocity)

    if (left && !up && !down && x < 7 * WIDTH / 8 && x > WIDTH / 2 && y > HEIGHT / 2) {
      return this.right(velocity, speed)
    }

    if (left && up && x < 6 * WIDTH / 8 && y > HEIGHT / 2) {
      return this.right(velocity, speed)
    }

    if (up && !left && x > WIDTH / 2 && y < 2 * HEIGHT / 8) {
      return this.left(velocity, speed)
    }

    if (up && left && x > WIDTH / 2 && y < HEIGHT / 8) {
      return this.left(velocity, speed)
    }

    if (left && !down && x < 3 * WIDTH / 8 && y < HEIGHT / 2) {
      return this.left(velocity, speed)
    }

    if (left && down && x < 2 * WIDTH / 8 && y < HEIGHT / 2) {
      return this.left(velocity, speed)
    }

    if (down && !left && !right && x < 2 * WIDTH / 2 && y > HEIGHT / 2) {
      return this.left(velocity, speed)
    }

    return velocity
  }

  // \    const position = Vector.from([WIDTH + 30, Math.floor(7 * HEIGHT / 8)])
  //  |   const velocity = Vector.from([-speed, 0])
  // /
  _leftHelixUp ({ position, velocity, speed }) {
    const [x, y] = position
    const { up, down, left, right } = this.directions(velocity)

    if (up && !left && !right && x < WIDTH / 2 && y > 7 * HEIGHT / 8 && y < HEIGHT + 40) {
      return this.right(velocity, speed)
    }

    if (up && right && x > 6 * WIDTH / 8) {
      return this.left(velocity, speed)
    }

    if (up && !right && x > 6 * WIDTH / 8 && y < HEIGHT / 2) {
      return this.left(velocity, speed)
    }

    return velocity
  }

  _rightHelixUp ({ position, velocity, speed }) {
    const [x, y] = position
    const { up, down, left, right } = this.directions(velocity)

    if (up && !left && !right && x > WIDTH / 2 && y > 7 * HEIGHT / 8 && y < HEIGHT + 40) {
      return this.left(velocity, speed)
    }

    if (up && left && x < 2 * WIDTH / 8) {
      return this.right(velocity, speed)
    }

    if (up && !left && x < 2 * WIDTH / 8 && y < HEIGHT / 2) {
      return this.right(velocity, speed)
    }

    return velocity
  }

  // todo: entrance right, middle-lower, loop?
  // todo: entrance top, upper left, loop?
  // todo: entrance left, lower, loop?
  // todo: rainfall is formation with staged x & y offsets

  static planRoute () {
    return new NavComputer({
      route: sample(ROUTES),
      invert: sample([true, false])
    })
  }
}

export default NavComputer
