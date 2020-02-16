import { STRAIGHT, YOKE_LEFT, YOKE_RIGHT } from '../constants/yoke_states.js'
import { EXPLOSION_WIDTH, EXPLOSION_HEIGHT, HALF_EXPLOSION_WIDTH, HALF_EXPLOSION_HEIGHT } from '../constants/dimensions.js'

// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const FRAMES = [
  document.querySelector('.sprite.damage-1'),
  document.querySelector('.sprite.damage-2'),
  document.querySelector('.sprite.damage-3'),
  document.querySelector('.sprite.damage-4'),
  document.querySelector('.sprite.damage-5'),
  document.querySelector('.sprite.damage-6'),
  document.querySelector('.sprite.damage-7'),
  document.querySelector('.sprite.damage-8')
]

const render = ({ element, object }) => {
  const context = element.getContext('2d')
  const image = FRAMES[object.animation + 1]

  context.drawImage(
    image,
    object.position.x - HALF_EXPLOSION_WIDTH,  // image upper-left x-coordinate
    object.position.y - HALF_EXPLOSION_HEIGHT, // image upper-left y-coordinate
    EXPLOSION_WIDTH, // image width
    EXPLOSION_HEIGHT // image height
  )
}

export default render
