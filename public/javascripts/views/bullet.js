// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const WIDTH = 3
const HEIGHT = 20
const HAWIDTH = WIDTH / 2
const HAHEIGHT = HEIGHT / 2

const render = ({ element, object }) => {
  const context = element.getContext('2d')

  context.lineWidth = 1

  object.spreads.forEach(distance => {
    if (distance <= object.spread) {
      context.fillStyle = '#ff0000'

      context.beginPath()
      context.rect(object.position.x - HAWIDTH - distance - 1, object.position.y - HAHEIGHT - 10, WIDTH + 2, HEIGHT)
      context.fill()

      context.beginPath()
      context.rect(object.position.x - HAWIDTH + distance - 1, object.position.y - HAHEIGHT - 10, WIDTH + 2, HEIGHT)
      context.fill()

      context.fillStyle = '#f0ff00'

      context.beginPath()
      context.rect(object.position.x - HAWIDTH - distance, object.position.y - HAHEIGHT - 10, WIDTH, HEIGHT)
      context.fill()

      context.beginPath()
      context.rect(object.position.x - HAWIDTH + distance, object.position.y - HAHEIGHT - 10, WIDTH, HEIGHT)
      context.fill()
    }
  })
}

export default render
