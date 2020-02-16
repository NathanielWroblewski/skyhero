import { INPUT_DIRECTION, RELEASE_DIRECTION, AUTOFIRE, HOLD_FIRE } from '../constants/events.js'
import { LEFT, UP, RIGHT, DOWN, A, B } from '../constants/keys.js'

// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class Controller {
  constructor ({ input }) {
    this.input = input
    this.depressed = {
      [UP]: false,
      [DOWN]: false,
      [LEFT]: false,
      [RIGHT]: false,
      [A]: false,
      [B]: false
    }
    this._on = {
      [INPUT_DIRECTION]: [],
      [RELEASE_DIRECTION]: [],
      [AUTOFIRE]: [],
      [HOLD_FIRE]: [],
    }

    this._setListeners()
  }

  _setListeners () {
    this.input.addEventListener('keydown', e => this._onKeyDown(e))
    this.input.addEventListener('keyup', e => this._onKeyUp(e))
  }

  get directions () {
    return {
      [UP]: this.depressed[UP] && !this.depressed[DOWN],
      [DOWN]: this.depressed[DOWN] && !this.depressed[UP],
      [LEFT]: this.depressed[LEFT] && !this.depressed[RIGHT],
      [RIGHT]: this.depressed[RIGHT] && !this.depressed[LEFT],
    }
  }

  _onKeyDown (event) {
    switch (event.keyCode) {
      case A:
        event.preventDefault()
        return this.trigger(AUTOFIRE)
      case UP:
      case DOWN:
      case LEFT:
      case RIGHT:
        event.preventDefault()
        this.depressed[event.keyCode] = true
        return this.trigger(INPUT_DIRECTION, this.directions)
      case B:
        event.preventDefault()
        return false
    }
  }

  _onKeyUp ({ keyCode }) {
    switch (keyCode) {
      case UP:
      case DOWN:
      case LEFT:
      case RIGHT:
        this.depressed[keyCode] = false
        return this.trigger(RELEASE_DIRECTION, this.directions)
      case A:
        return this.trigger(HOLD_FIRE)
    }
  }

  on (event, callback) {
    if (this._on[event]) {
      this._on[event].push(callback)
    }
  }

  trigger (event, payload) {
    if (this._on[event]) {
      this._on[event].forEach(callback => callback(payload))
    }
  }
}

export default Controller
