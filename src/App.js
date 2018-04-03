import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import { Platform } from 'react-native'
import {Provider} from 'mobx-react/native'
import UserScreen from './screens/UserScreen'
import HomeScreen from './screens/HomeScreen'
import stores from './stores'

const ExampleRoutes = {
  Home: {
    name: 'Stack Example',
    description: 'A card stack',
    screen: HomeScreen
  },
  User: {
    name: 'Tabs Example',
    description: 'Tabs following platform conventions',
    screen: UserScreen
  }
}

const AppNavigator = StackNavigator(
  {
    ...ExampleRoutes,
    Index: {
      screen: HomeScreen
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',

    /*
   * Use modal on iOS because the card mode comes from the right,
   * which conflicts with the drawer example gesture
   */
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
  }
)

export default class App extends Component {
  render () {
    return (
      <Provider {...stores}>
        <AppNavigator />
      </Provider>
    )
  }
}
