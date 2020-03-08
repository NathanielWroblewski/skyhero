import { INPUT_DIRECTION, RELEASE_DIRECTION, AUTOFIRE, HOLD_FIRE } from '../constants/events.js'
import { LEFT, UP, RIGHT, DOWN, A, B } from '../constants/keys.js'

// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class Controller {
  constructor ({ input, canvas, player }) {
    this.input = input
    this.canvas = canvas
    this.player = player
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
    this._isTouching = false
    this._latestTouchEvent = null

    this._setListeners()
  }

  _setListeners () {
    this.input.addEventListener('keydown', e => this._onKeyDown(e))
    this.input.addEventListener('keyup', e => this._onKeyUp(e))

    if ('ontouchstart' in window) {
      this.input.addEventListener('touchstart', e => this._onTouchStart(e))
      this.input.addEventListener('touchend', e => this._onTouchEnd(e))
      this.input.addEventListener('touchmove', e => {
        this._latestTouchEvent = e
        this._onTouchMove(e)
      })
    }
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

        return this._autofire()
      case UP:
      case DOWN:
      case LEFT:
      case RIGHT:
        event.preventDefault()

        return this._inputDirection(event.keyCode)
    }
  }

  _onKeyUp ({ keyCode }) {
    switch (keyCode) {
      case UP:
      case DOWN:
      case LEFT:
      case RIGHT:
        return this._releaseDirection(keyCode)
      case A:
        return this._holdFire()
    }
  }

  _onTouchStart (event) {
    this._isTouching = true
    this._latestTouchEvent = event

    this._autofire()
    this._onTouchMove(event)
  }

  _onTouchEnd (event) {
    [UP, DOWN, LEFT, RIGHT].forEach(direction => this.depressed[direction] = false)

    this._isTouching = false
    this._latestTouchEvent = null

    this._holdFire()
    this._releaseDirection(UP)
  }

  _onTouchMove (event) {
    const { touches } = event
    const { left, top } = this.canvas.getBoundingClientRect()
    const { x, y } = this.player.position
    const spriteOffset = 20

    if (!touches || !this._isTouching || event != this._latestTouchEvent) return false

    const fingerX = touches[0].clientX - left
    const fingerY = touches[0].clientY - top

    if (fingerX < x - spriteOffset) {
      this._releaseDirection(RIGHT)
      this._inputDirection(LEFT)
    }

    if (fingerX > x + spriteOffset) {
      this._releaseDirection(LEFT)
      this._inputDirection(RIGHT)
    }

    if (fingerX > x - spriteOffset && fingerX < x + spriteOffset) {
      this._releaseDirection(LEFT)
      this._releaseDirection(RIGHT)
    }

    if (fingerY < y - spriteOffset) {
      this._releaseDirection(DOWN)
      this._inputDirection(UP)
    }

    if (fingerY > y + spriteOffset) {
      this._releaseDirection(UP)
      this._inputDirection(DOWN)
    }

    if (fingerY > y - spriteOffset && fingerY < y + spriteOffset) {
      this._releaseDirection(UP)
      this._releaseDirection(DOWN)
    }

    if (this._isTouching) setTimeout(() => this._onTouchMove(event), 100)
  }

  _autofire (event) {
    return this.trigger(AUTOFIRE)
  }

  _holdFire () {
    return this.trigger(HOLD_FIRE)
  }

  _inputDirection (direction) {
    this.depressed[direction] = true

    return this.trigger(INPUT_DIRECTION, this.directions)
  }

  _releaseDirection (direction) {
    this.depressed[direction] = false

    return this.trigger(RELEASE_DIRECTION, this.directions)
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
