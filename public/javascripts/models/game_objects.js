import Vector from './vector.js'
import Damage from './damage.js'
import { HEIGHT, WIDTH, INBOUNDS_OFFSET } from '../constants/boundaries.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const inBounds = ({ isStaged, position }, offset) => (
  isStaged || (
    position.x > (0 - offset.x) &&
    position.x < (WIDTH + offset.x) &&
    position.y > (0 - offset.y) &&
    position.y < HEIGHT + offset.y
  )
)

class GameObjects {
  constructor ({
    player, bullets = [], bandits = [], damages = [], trees = [], terrain = [],
    grounds = [], tree_shadows = [], panzers = [], rockets = [], bunkers = []
  }) {
    this.players = [player]
    this.grounds = grounds
    this.panzers = panzers
    this.bunkers = bunkers
    this.bullets = bullets
    this.bandits = bandits
    this.damages = damages
    this.rockets = rockets
    this.trees = trees
    this.tree_shadows = tree_shadows

    this._on = {
      points: []
    }
  }

  get all () {
    return [
      ...this.grounds,
      ...this.panzers,
      ...this.bunkers,
      ...this.tree_shadows,
      ...this.trees,
      ...this.bullets,
      ...this.bandits,
      ...this.damages,
      ...this.rockets,
      ...this.players
    ]
  }

  tick () {
    this.all.forEach(object => object.tick(this.players))
    this.damages = this.damages.filter(animation => !animation.isOver)
  }

  bound () {
    this.players.forEach(player => player.bound(WIDTH, HEIGHT, 5))

    this.filter(object => inBounds(object, Vector.from([INBOUNDS_OFFSET, INBOUNDS_OFFSET])))
  }

  isIntersecting (object, target) {
    const { x: [objectMinX, objectMaxX], y: [objectMinY, objectMaxY] } = object.extent
    const { x: [targetMinX, targetMaxX], y: [targetMinY, targetMaxY] } = target.extent

    return !(
      objectMaxX < targetMinX ||
      objectMinX > targetMaxX ||
      objectMinY > targetMaxY ||
      objectMaxY < targetMinY
    )
  }

  collide (object, target, velocity) {
    object.collide()
    target.collide()

    this.damages.push(new Damage({
      position: object.position,
      velocity: velocity || Vector.from([0, 0])
    }))
  }

  collideAll () {
    this.bullets.forEach(bullet => {
      this.bandits.forEach(bandit => {
        if (this.isIntersecting(bullet, bandit)) {
          this.collide(bandit, bullet)

          if (bandit.collision) this.trigger('points')
        }
      })

      this.panzers.forEach(panzer => {
        if (this.isIntersecting(bullet, panzer)) {
          this.collide(panzer, bullet, Vector.from([0, 0.5]))

          if (panzer.collision) this.trigger('points')
        }
      })

      this.bunkers.forEach(bunker => {
        if (bunker.hp && this.isIntersecting(bullet, bunker)) {
          this.collide(bunker, bullet, Vector.from([0, 0.5]))

          if (bunker.collision) this.trigger('points')
        }
      })
    })

    this.players.forEach(player => {
      this.bandits.forEach(bandit => {
        if (!bandit.collision && this.isIntersecting(bandit, player)) {
          this.collide(player, bandit)
        }
      })

      this.rockets.forEach(rocket => {
        if (!rocket.collision && this.isIntersecting(rocket, player)) {
          this.collide(player, rocket)
        }
      })
    })

    this.filter(obj => !obj.collision)
  }

  filter (predicate) {
    this.grounds = this.grounds.filter(predicate)
    this.panzers = this.panzers.filter(predicate)
    this.bullets = this.bullets.filter(predicate)
    this.bandits = this.bandits.filter(predicate)
    this.damages = this.damages.filter(predicate)
    this.players = this.players.filter(predicate)
    this.rockets = this.rockets.filter(predicate)
    this.trees = this.trees.filter(predicate)
    this.tree_shadows = this.tree_shadows.filter(predicate)
  }

  addWave (type, wave) {
    this[type] = this[type].concat(wave)
  }

  on (event, callback) {
    this._on[event].push(callback)
  }

  trigger (event) {
    this._on[event].forEach(callback => callback(this))
  }
}

export default GameObjects