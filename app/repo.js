import Microcosm from 'microcosm'
import Game from './domains/game'

export default class Repo extends Microcosm {
  setup() {
    this.addDomain('game', Game)
  }
}
