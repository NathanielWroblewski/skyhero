import Vector from '../models/vector.js'
import { STRAIGHT, YOKE_LEFT, YOKE_RIGHT } from '../constants/yoke_states.js'
import { sample } from '../utilities/index.js'

// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const BOMBER_WIDTH = 166
const BOMBER_HEIGHT = 119
const SCALE = 1
const SCALED_BOMBER_IMG_WIDTH = SCALE * BOMBER_WIDTH
const SCALED_BOMBER_IMG_HEIGHT = SCALE * BOMBER_HEIGHT
const HALF_SCALED_BOMBER_IMG_WIDTH = 0.5 * SCALED_BOMBER_IMG_WIDTH
const HALF_SCALED_BOMBER_IMG_HEIGHT = 0.5 * SCALED_BOMBER_IMG_HEIGHT
const X_SHADOW_OFFSET = 60
const Y_SHADOW_OFFSET = 60

const IMG = {
  bomber: document.querySelector('.sprite.bomber'),
  shadow: document.querySelector('.sprite.bomber.shadow'),
}

const render = ({ element, object, players }) => {
  const context = element.getContext('2d')

  context.drawImage(
    IMG.shadow,
    object.position.x - HALF_SCALED_BOMBER_IMG_WIDTH + X_SHADOW_OFFSET,  // image upper-left x-coordinate
    object.position.y - HALF_SCALED_BOMBER_IMG_HEIGHT + Y_SHADOW_OFFSET, // image upper-left y-coordinate
    HALF_SCALED_BOMBER_IMG_WIDTH, // image width
    HALF_SCALED_BOMBER_IMG_HEIGHT // image height
  )

  context.drawImage(
    IMG.bomber,
    object.position.x - HALF_SCALED_BOMBER_IMG_WIDTH,  // image upper-left x-coordinate
    object.position.y - HALF_SCALED_BOMBER_IMG_HEIGHT, // image upper-left y-coordinate
    SCALED_BOMBER_IMG_WIDTH, // image width
    SCALED_BOMBER_IMG_HEIGHT // image height
  )
}

export default render
