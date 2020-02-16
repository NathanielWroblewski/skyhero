// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.
const IMG = [
  document.querySelector('.sprite.ground-1'),
  document.querySelector('.sprite.ground-2'),
]
const GROUND_IMG_WIDTH = 64
const GROUND_IMG_HEIGHT = 64

const render = ({ element, object }) => {
  const context = element.getContext('2d')
  const image = IMG[object.variation]

  if (image) {
    context.drawImage(
      image,
      object.position.x,  // image upper-left x-coordinate
      object.position.y, // image upper-left y-coordinate
      GROUND_IMG_WIDTH, // image width
      GROUND_IMG_HEIGHT // image height
    )
  }
}

export default render
