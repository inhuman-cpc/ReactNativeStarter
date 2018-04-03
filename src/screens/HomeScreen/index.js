import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'

@inject('homeStore')
@observer
export default class UserScreen extends Component {
  static propTypes = {
    homeStore: PropTypes.object,
    navigation: PropTypes.object
  }

  render () {
    const { homeStore } = this.props
    return (
      <View style={{marginTop: 100}}>
        <Text>Users count: {homeStore.count}</Text>
        <Button onPress={() => homeStore.onMinus()} title="Minus" />
        <Button onPress={() => this.props.navigation.navigate('User')} title="Redirect" />
      </View>
    )
  }
}
