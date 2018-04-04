import React, { Component } from 'react'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import { Platform } from 'react-native'
import {Provider} from 'mobx-react/native'
import UserScreen from './screens/UserScreen'
import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'
import SettingsScreen from './screens/SettingsScreen'
import stores from './stores'

const stackOptions = {
  headerMode: 'none',

  /*
 * Use modal on iOS because the card mode comes from the right,
 * which conflicts with the drawer example gesture
 */
  mode: Platform.OS === 'ios' ? 'modal' : 'card'
}
const HomeStack = StackNavigator(
  {
    Home: {screen: HomeScreen},
    Detail: {screen: DetailScreen}
  }, {
    ...stackOptions,
    initialRouteName: 'Home'
  }
)
const UserStack = StackNavigator(
  {
    User: {screen: UserScreen},
    Settings: {screen: SettingsScreen}
  }, {
    ...stackOptions,
    initialRouteName: 'User'
  }
)
const AppNavigator = TabNavigator(
  {
    Home: {screen: HomeStack},
    User: {screen: UserStack}
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
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
