import Vector from '../models/vector.js'
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
  '02': document.querySelector('.sprite.plane-2'),
  '03': document.querySelector('.sprite.plane-3'),
  '04': document.querySelector('.sprite.plane-4'),
  '05': document.querySelector('.sprite.plane-5'),
  shadow: document.querySelector('.sprite.plane-2.shadow')
}

const angle = vector => (
  (Math.atan2(vector.y, vector.x) * 180 / Math.PI) + 90
)

const render = ({ element, object }) => {
  const context = element.getContext('2d')
  const image = IMG[object.classification]
  const rotation = angle(object.velocity) * Math.PI/ 180

  context.save()
  context.translate(object.position.x + X_SHADOW_OFFSET, object.position.y + Y_SHADOW_OFFSET)
  context.rotate(rotation)

  context.drawImage(
    IMG.shadow,
    (-HALF_SCALED_PLAYER_IMG_WIDTH / 2),
    (-HALF_SCALED_PLAYER_IMG_HEIGHT / 2),
    SCALED_PLAYER_IMG_WIDTH / 2,
    SCALED_PLAYER_IMG_HEIGHT / 2
  )

  context.restore()
  context.save()

  context.translate(object.position.x, object.position.y)
  context.rotate(rotation)

  context.drawImage(
    image,
    -HALF_SCALED_PLAYER_IMG_WIDTH,  // image upper-left x-coordinate
    -HALF_SCALED_PLAYER_IMG_HEIGHT, // image upper-left y-coordinate
    SCALED_PLAYER_IMG_WIDTH, // image width
    SCALED_PLAYER_IMG_HEIGHT // image height
  )

  context.restore()
}

export default render
