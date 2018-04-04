import { observable, action } from 'mobx'

class Store {
  @observable username = 'Berkshire Hathaway'

  @action changeUsername (username) {
    this.username = username
  }
}

export default new Store()
