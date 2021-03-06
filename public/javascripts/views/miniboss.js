// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const MINBOSS_WIDTH = 164
const MINBOSS_HEIGHT = 121
const SCALE = 1
const SCALED_MINBOSS_IMG_WIDTH = SCALE * MINBOSS_WIDTH
const SCALED_MINBOSS_IMG_HEIGHT = SCALE * MINBOSS_HEIGHT
const HALF_SCALED_MINBOSS_IMG_WIDTH = 0.5 * SCALED_MINBOSS_IMG_WIDTH
const HALF_SCALED_MINBOSS_IMG_HEIGHT = 0.5 * SCALED_MINBOSS_IMG_HEIGHT
const X_SHADOW_OFFSET = 60
const Y_SHADOW_OFFSET = 60

const IMG = {
  miniboss: document.querySelector('.sprite.miniboss'),
  shadow: document.querySelector('.sprite.miniboss.shadow'),
}

const render = ({ element, object, players }) => {
  const context = element.getContext('2d')

  context.drawImage(
    IMG.shadow,
    object.position.x - HALF_SCALED_MINBOSS_IMG_WIDTH + X_SHADOW_OFFSET,  // image upper-left x-coordinate
    object.position.y - HALF_SCALED_MINBOSS_IMG_HEIGHT + Y_SHADOW_OFFSET, // image upper-left y-coordinate
    HALF_SCALED_MINBOSS_IMG_WIDTH, // image width
    HALF_SCALED_MINBOSS_IMG_HEIGHT // image height
  )

  context.drawImage(
    IMG.miniboss,
    object.position.x - HALF_SCALED_MINBOSS_IMG_WIDTH,  // image upper-left x-coordinate
    object.position.y - HALF_SCALED_MINBOSS_IMG_HEIGHT, // image upper-left y-coordinate
    SCALED_MINBOSS_IMG_WIDTH, // image width
    SCALED_MINBOSS_IMG_HEIGHT // image height
  )
}

export default render
