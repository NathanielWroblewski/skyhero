// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const DIMENSION = 60
const HALF_DIMENSION = DIMENSION / 2
const RADIUS = 5

const render = ({ element, object }) => {
  const context = element.getContext('2d')

  if (object.frame % 4 < 2) {
    context.strokeStyle = '#666'
    context.fillStyle = '#dadfe1'
    context.lineJoin = 'round'
    context.lineWidth = RADIUS

    context.beginPath()
    context.rect(
      object.position.x - HALF_DIMENSION,
      object.position.y - HALF_DIMENSION,
      DIMENSION,
      DIMENSION
    )

    context.fill()
    context.stroke()

    context.fillStyle = '#666'
    context.font = '52px sans-serif'
    context.textBaseline = 'middle'
    context.textAlign = 'center'

    context.beginPath()
    context.fillText(
      'S',
      object.position.x,
      object.position.y + 2,
      DIMENSION
    )

    context.lineJoin = 'miter'
  }
}

export default render
