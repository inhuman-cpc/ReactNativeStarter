import { observable, action } from 'mobx'

class Store {
  @observable items = []

  @observable selected = null

  @action push () {
    let id = Date.now().toString(32).toUpperCase()
    this.items.push({
      id
    })
  }

  @action select (id) {
    this.selected = id
  }

  @action clear () {
    this.items.length = 0
  }
}

export default new Store()
