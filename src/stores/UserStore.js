import { observable, action } from 'mobx'

class Store {
  @observable username = 'Berkshire Hathaway'
  @observable count = 0

  @action changeUsername (username) {
    this.username = username
  }

  @action setCounter (num) {
    this.count = num || 0
  }
}

export default new Store()
