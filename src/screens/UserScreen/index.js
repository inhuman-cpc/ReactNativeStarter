import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'

@inject('users')
@observer
export default class UserScreen extends Component {
  static propTypes = {
    users: PropTypes.array
  }

  render () {
    const { users } = this.props
    return (
      <Text>Users count: {users.length}</Text>
    )
  }
}
