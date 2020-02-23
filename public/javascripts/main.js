import Vector from './models/vector.js'
import Player from './models/player.js'
import Bullet from './models/bullet.js'
import Bandit from './models/bandit.js'
import Fronds from './models/tree.js'
import Ground from './models/ground.js'
import Panzer from './models/panzer.js'
import Rocket from './models/rocket.js'
import Bunker from './models/bunker.js'
import Bomber from './models/bomber.js'
import Factory from './models/factory.js'
import Kamikazi from './models/kamikazi.js'
import TreeShadow from './models/tree_shadow.js'
import WaveMachine from './models/wave_machine.js'
import Controller from './controllers/controller.js'
import GameObjects from './models/game_objects.js'
import GameState from './models/game_state.js'
import renderObject from './views/object.js'
import { INPUT_DIRECTION, RELEASE_DIRECTION, AUTOFIRE, HOLD_FIRE } from './constants/events.js'
import { BOMBER } from './constants/object_types.js'
import { WIDTH, HEIGHT } from './constants/boundaries.js'
import { tile, shuffle, angle } from './utilities/index.js'

const points = document.querySelector('.points')

const element = document.querySelector('.game')
const controller = new Controller({ input: document })
const player = new Player({
  position: Vector.from([300, 550]),
  velocity: Vector.from([0, 0]),
  speed: 5,
  cooldown: 10
})
const panzers = [
  new Panzer({
    position: Vector.from([300, 300]),
    velocity: Vector.from([0, 0.5]),
    temperature: 2,
    firing: true
  })
]
const waveMachine = new WaveMachine({ waves: 1, cooldown: 600 })
const formations = new WaveMachine({ waves: 1, cooldown: 3000 }) // longest wave takes 1000, should be like ten times that
const treeFactory = Factory.tree()
const trees = Array(3).fill(0).map(() => treeFactory.seed({ x: [0, WIDTH], y: [0, HEIGHT] }))
const tree_shadows = trees.map(({ position, velocity, classification }) => (
  new TreeShadow({ position, velocity, classification })
))
const objects = new GameObjects({
  player,
  trees,
  tree_shadows,
  panzers,
  grounds: tile([0, WIDTH], [0, HEIGHT], [64, 64], (x, y) => {
    return new Ground({
      position: Vector.from([x, y]),
      velocity: Vector.from([0, 0.5]),
      variation: Math.random() < 0.4 ? 2 : (Math.random() < 0.5 ? 0 : 1)
    })
  }).reverse()
})
const state = new GameState({})

const WAVES = [
  { factory: Panzer, type: 'panzers' },
  // { factory: Bandit, type: 'bandits' },
  { factory: Kamikazi, type: 'bandits' },
  { factory: Kamikazi, type: 'bandits' },
  { factory: Bunker, type: 'bunkers' },
  { factory: Bomber, type: 'bombers' },
]

controller.on(INPUT_DIRECTION, directions => player.move(directions))
controller.on(RELEASE_DIRECTION, directions => player.stop(directions))
controller.on(AUTOFIRE, () => player.fire())
controller.on(HOLD_FIRE, () => player.holdfire())

objects.on('points', () => {
  state.point()
  points.innerHTML = state.score.toLocaleString()
})

const step = () => {
  if (objects.grounds[objects.grounds.length - 1].position.y === 0) {
    tile([0, WIDTH], [-64, 0], [64, 64], (x, y) => {
      objects.grounds.push(new Ground({
        position: Vector.from([x, y]),
        velocity: Vector.from([0, 0.5]),
        variation: Math.random() < 0.4 ? 2 : (Math.random() < 0.5 ? 0 : 1)
      }))
    })
  }

  objects.bound()

  if (player.firing && player.gunsCooled && !player.collision) {
    objects.bullets.push(new Bullet({
      position: player.position,
      velocity: Vector.from([0, -10])
    }))
  }

  objects.panzers.forEach(panzer => {
    if (panzer.firing && panzer.gunsCooled) {
      const radians = (panzer.turretAngle - 90) * Math.PI / 180
      const velocity = Vector.from([Math.cos(radians), Math.sin(radians)]).multiply(4)

      objects.rockets.push(new Rocket({
        position: panzer.position.add(velocity.multiply(5)),
        velocity
      }))
    }
  })

  objects.bunkers.forEach(bunker => {
    if (bunker.firing && bunker.gunsCooled) {
      const radians = (bunker.turretAngle - 90) * Math.PI / 180
      const velocity = Vector.from([Math.cos(radians), Math.sin(radians)]).multiply(4)

      objects.rockets.push(new Rocket({
        position: bunker.position.add(velocity.multiply(5)),
        velocity
      }))
    }
  })

  objects.bombers.forEach(bomber => {
    if (objects.players.length && bomber.firing && bomber.gunsCooled) {
      const degree = angle(player.position, bomber.position)
      const degrees = [degree, degree + 10, degree - 10]

      degrees.forEach(deg => {
        const radians = deg * Math.PI / 180
        const velocity = Vector.from([Math.cos(radians), Math.sin(radians)]).multiply(4)

        objects.rockets.push(new Rocket({
          position: bomber.position.add(velocity.multiply(5)),
          velocity
        }))
      })
    }
  })

  if (player.firing && player.gunsCooled && !player.collision) {
    objects.bullets.push(new Bullet({
      position: player.position,
      velocity: Vector.from([0, -10])
    }))
  }

  const tree = treeFactory.spawn()
  if (tree) {
    objects.trees.push(tree)
    objects.tree_shadows.push(new TreeShadow({
      position: tree.position,
      velocity: tree.velocity,
      classification: tree.classification
    }))
  }

  if (objects.players.length) {
    const difficulty = state.difficulty

    waveMachine.tick()
    formations.tick()

    waveMachine.launch(() => {
      const waves = difficulty < 3 || objects.bombers.length ?
        WAVES.filter(obj => obj.type !== 'bombers') : WAVES

      shuffle(waves).slice(0, difficulty).forEach(object => {
        objects.addWave(object.type, object.factory.wave({ objects, difficulty }))
      })

      state.ratchet()
    })

    formations.launch(() => {
      objects.addWave('bandits', Bandit.formation({ objects, difficulty }))
    })
  }

  objects.tick()
  objects.collideAll()

  element.getContext('2d').clearRect(0, 0, 600, 600)
  objects.all.forEach(object => renderObject({ element, object, players: objects.players }))

  window.requestAnimationFrame(() => step())
}

window.requestAnimationFrame(() => step())
