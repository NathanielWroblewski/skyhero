// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.
const IMG = [
  document.querySelector('.sprite.tree-1.shadow'),
  document.querySelector('.sprite.tree-2.shadow'),
]
const TREE_IMG_WIDTH = 96
const TREE_IMG_HEIGHT = 81
const HALF_TREE_IMG_WIDTH = TREE_IMG_WIDTH / 2
const HALF_TREE_IMG_HEIGHT = TREE_IMG_HEIGHT / 2

const X_SHADOW_OFFSET = 20
const Y_SHADOW_OFFSET = 15

const render = ({ element, object }) => {
  const context = element.getContext('2d')

  context.drawImage(
    IMG[object.classification],
    (object.position.x + X_SHADOW_OFFSET) - HALF_TREE_IMG_WIDTH,  // image upper-left x-coordinate
    (object.position.y + Y_SHADOW_OFFSET) - HALF_TREE_IMG_HEIGHT, // image upper-left y-coordinate
    TREE_IMG_WIDTH, // image width
    TREE_IMG_WIDTH // image height
  )
}

export default render
