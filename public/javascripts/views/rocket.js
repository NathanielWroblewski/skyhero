import renderCircle from './circle.js'

// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const render = ({ element, object }) => {
  const radius = (object.frame % 4 > 2) ? object.radius : (object.radius / 2)

  renderCircle({ element, object, radius, fill: '#eee', stroke: '#000' })
}

export default render
