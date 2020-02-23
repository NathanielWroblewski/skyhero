import renderBullet from './bullet.js'
import renderPlayer from './player.js'
import renderBandit from './bandit.js'
import renderDamage from './damage.js'
import renderFronds from './fronds.js'
import renderGround from './ground.js'
import renderPanzer from './panzer.js'
import renderRocket from './rocket.js'
import renderBunker from './bunker.js'
import renderBomber from './bomber.js'
import renderUpgrade from './upgrade.js'
import renderTreeShadow from './tree_shadow.js'
import renderSmoke from './smoke.js'
import {
  BULLET, PLAYER, BANDIT, DAMAGE, FRONDS, GROUND, TREE_SHADOW, PANZER, ROCKET,
  BUNKER, BOMBER, SMOKE, UPGRADE,
} from '../constants/object_types.js'

// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const GAME_OBJECTS = {
  [BULLET]: renderBullet,
  [PLAYER]: renderPlayer,
  [BANDIT]: renderBandit,
  [DAMAGE]: renderDamage,
  [FRONDS]: renderFronds,
  [GROUND]: renderGround,
  [PANZER]: renderPanzer,
  [ROCKET]: renderRocket,
  [BUNKER]: renderBunker,
  [BOMBER]: renderBomber,
  [TREE_SHADOW]: renderTreeShadow,
  [UPGRADE]: renderUpgrade,
  [SMOKE]: renderSmoke,
}

const render = ({ element, object, players }) => {
  const context = element.getContext('2d')

  GAME_OBJECTS[object.type]({ element, object, players })
}

export default render
