// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const TAU = 2 * Math.PI

const render = ({ element, object, radius, stroke, fill }) => {
  const context = element.getContext('2d')

  context.fillStyle = fill
  context.strokeStyle = stroke
  context.beginPath()
  context.arc(object.position.x, object.position.y, radius, 0, TAU)
  context.fill()
  context.stroke()
}

export default render
