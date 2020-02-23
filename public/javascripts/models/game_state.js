// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const MIN_DIFFICULTY = 2
const MAX_DIFFICULTY = 5

class GameState {
  constructor ({}) {
    this.hasStarted = false
    this.isOver = false
    this.score = 0

    this.round = 0
    this.difficulty = 1
    this.difficultyDirection = 1
  }

  ratchet () {
    if (this.difficulty === MAX_DIFFICULTY) this.difficultyDirection = -1
    if (this.difficulty === MIN_DIFFICULTY) {
      this.difficultyDirection = 1
      this.round++
    }

    this.difficulty = this.difficulty + this.difficultyDirection
  }

  point () {
    this.score = this.score + 10
  }
}

export default GameState
