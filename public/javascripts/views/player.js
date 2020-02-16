import { STRAIGHT, YOKE_LEFT, YOKE_RIGHT } from '../constants/yoke_states.js'
import { PLANE_WIDTH, PLANE_HEIGHT } from '../constants/dimensions.js'

// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const SCALE = 1
const SCALED_PLAYER_IMG_WIDTH = SCALE * PLANE_WIDTH
const SCALED_PLAYER_IMG_HEIGHT = SCALE * PLANE_HEIGHT
const HALF_SCALED_PLAYER_IMG_WIDTH = 0.5 * SCALED_PLAYER_IMG_WIDTH
const HALF_SCALED_PLAYER_IMG_HEIGHT = 0.5 * SCALED_PLAYER_IMG_HEIGHT

const X_SHADOW_OFFSET = 60
const Y_SHADOW_OFFSET = 60

const IMG = {
  [STRAIGHT]: {
    plane: document.querySelector('.sprite.player.straight-01'),
    shadow: document.querySelector('.sprite.player.shadow'),
  },
  [YOKE_LEFT]: {
    plane: document.querySelector('.sprite.player.left'),
    shadow: document.querySelector('.sprite.player.turn.shadow'),
  },
  [YOKE_RIGHT]: {
    plane: document.querySelector('.sprite.player.right'),
    shadow: document.querySelector('.sprite.player.turn.shadow'),
  }
}

const render = ({ element, object }) => {
  const context = element.getContext('2d')
  const image = IMG[object.yokeState]

  context.drawImage(
    image.shadow,
    object.position.x - (HALF_SCALED_PLAYER_IMG_WIDTH / 2) + X_SHADOW_OFFSET,  // image upper-left x-coordinate
    object.position.y - (HALF_SCALED_PLAYER_IMG_HEIGHT / 2) + Y_SHADOW_OFFSET, // image upper-left y-coordinate
    SCALED_PLAYER_IMG_WIDTH / 2, // image width
    SCALED_PLAYER_IMG_HEIGHT / 2 // image height
  )

  context.drawImage(
    image.plane,
    object.position.x - HALF_SCALED_PLAYER_IMG_WIDTH,  // image upper-left x-coordinate
    object.position.y - HALF_SCALED_PLAYER_IMG_HEIGHT, // image upper-left y-coordinate
    SCALED_PLAYER_IMG_WIDTH, // image width
    SCALED_PLAYER_IMG_HEIGHT // image height
  )
}

export default render
