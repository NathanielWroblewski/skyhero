// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

export const sample = array => (
  array[Math.floor(Math.random() * array.length)]
)

export const shuffle = array => {
  const clone = array.map(x => x)

  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [clone[i], clone[j]] = [clone[j], clone[i]]
  }

  return clone
}

export const tile = ([xmin, xmax], [ymin, ymax], [xstep, ystep], fn) => {
  const results = []

  for (let x = xmin; x < xmax; x += xstep) {
    for (let y = ymin; y < ymax; y += ystep) {
      results.push(fn(x, y))
    }
  }

  return results
}

export const angle = (position, target) => {
  const diff = position.subtract(target)

  return Math.atan2(diff.y, diff.x) / Math.PI * 180
}

export const audioPath = file => `/public/audio/${file}`
