import Vector from '../models/vector.js'
import { STRAIGHT, YOKE_LEFT, YOKE_RIGHT } from '../constants/yoke_states.js'
import { sample } from '../utilities/index.js'

// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const TANK_WIDTH = 33
const TANK_HEIGHT = 60
const SCALE = 1
const SCALED_TANK_IMG_WIDTH = SCALE * TANK_WIDTH
const SCALED_TANK_IMG_HEIGHT = SCALE * TANK_HEIGHT
const HALF_SCALED_TANK_IMG_WIDTH = 0.5 * SCALED_TANK_IMG_WIDTH
const HALF_SCALED_TANK_IMG_HEIGHT = 0.5 * SCALED_TANK_IMG_HEIGHT
const X_SHADOW_OFFSET = 5
const Y_SHADOW_OFFSET = 5

const IMG = {
  body: document.querySelector('.sprite.tank.panzer.body'),
  turret: document.querySelector('.sprite.tank.panzer.turret'),
  body_shadow: document.querySelector('.sprite.tank.body.shadow'),
  turret_shadow: document.querySelector('.sprite.tank.turret.shadow')
}

const render = ({ element, object, players }) => {
  const context = element.getContext('2d')
  const bodyAngle = object.getBodyAngle()

  context.save()
  context.translate(object.position.x, object.position.y)
  context.rotate(bodyAngle * Math.PI / 180)

  context.drawImage(
    IMG.body_shadow,
    -HALF_SCALED_TANK_IMG_WIDTH + ((bodyAngle < 0 || bodyAngle === 180  ? -1 : 1) * X_SHADOW_OFFSET),  // image upper-left x-coordinate
    -HALF_SCALED_TANK_IMG_HEIGHT - ((bodyAngle < 0 ? -1 : 1) * Y_SHADOW_OFFSET), // image upper-left y-coordinate
    SCALED_TANK_IMG_WIDTH, // image width
    SCALED_TANK_IMG_HEIGHT// image height
  )

  context.drawImage(
    IMG.body,
    -HALF_SCALED_TANK_IMG_WIDTH,  // image upper-left x-coordinate
    -HALF_SCALED_TANK_IMG_HEIGHT, // image upper-left y-coordinate
    SCALED_TANK_IMG_WIDTH, // image width
    SCALED_TANK_IMG_HEIGHT// image height
  )

  context.restore()

  context.save()
  context.translate(object.position.x, object.position.y)
  context.rotate(object.turretAngle * Math.PI / 180)

  context.drawImage(
    IMG.turret,
    -HALF_SCALED_TANK_IMG_WIDTH,  // image upper-left x-coordinate
    -HALF_SCALED_TANK_IMG_HEIGHT, // image upper-left y-coordinate
    SCALED_TANK_IMG_WIDTH, // image width
    SCALED_TANK_IMG_HEIGHT // image height
  )

  context.restore()
}

export default render
