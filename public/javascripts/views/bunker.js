import Vector from '../models/vector.js'
import { STRAIGHT, YOKE_LEFT, YOKE_RIGHT } from '../constants/yoke_states.js'
import { sample } from '../utilities/index.js'

// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const BUNKER_WIDTH = 60
const BUNKER_HEIGHT = 60
const SCALE = 1
const SCALED_BUNKER_IMG_WIDTH = SCALE * BUNKER_WIDTH
const SCALED_BUNKER_IMG_HEIGHT = SCALE * BUNKER_HEIGHT
const HALF_SCALED_BUNKER_IMG_WIDTH = 0.5 * SCALED_BUNKER_IMG_WIDTH
const HALF_SCALED_BUNKER_IMG_HEIGHT = 0.5 * SCALED_BUNKER_IMG_HEIGHT
const X_SHADOW_OFFSET = 5
const Y_SHADOW_OFFSET = 5

const IMG = {
  bunker: document.querySelector('.sprite.bunker.body'),
  turret: document.querySelector('.sprite.bunker.turret'),
  shadow: document.querySelector('.sprite.bunker.shadow'),
}

const render = ({ element, object, players }) => {
  const context = element.getContext('2d')

  context.drawImage(
    IMG.shadow,
    object.position.x - HALF_SCALED_BUNKER_IMG_WIDTH + X_SHADOW_OFFSET,  // image upper-left x-coordinate
    object.position.y - HALF_SCALED_BUNKER_IMG_HEIGHT + Y_SHADOW_OFFSET, // image upper-left y-coordinate
    SCALED_BUNKER_IMG_WIDTH, // image width
    SCALED_BUNKER_IMG_HEIGHT // image height
  )

  context.drawImage(
    IMG.bunker,
    object.position.x - HALF_SCALED_BUNKER_IMG_WIDTH,  // image upper-left x-coordinate
    object.position.y - HALF_SCALED_BUNKER_IMG_HEIGHT, // image upper-left y-coordinate
    SCALED_BUNKER_IMG_WIDTH, // image width
    SCALED_BUNKER_IMG_HEIGHT // image height
  )

  if (object.hp) {
    context.save()
    context.translate(object.position.x, object.position.y)
    context.rotate(object.turretAngle * Math.PI / 180)

    context.drawImage(
      IMG.turret,
      -HALF_SCALED_BUNKER_IMG_WIDTH,  // image upper-left x-coordinate
      -HALF_SCALED_BUNKER_IMG_HEIGHT, // image upper-left y-coordinate
      SCALED_BUNKER_IMG_WIDTH, // image width
      SCALED_BUNKER_IMG_HEIGHT // image height
    )

    context.restore()
  }
}

export default render
