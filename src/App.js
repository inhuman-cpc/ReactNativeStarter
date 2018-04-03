import { Navigation } from 'react-native-navigation'
import Provider from './libs/MobxRnnProvider'
import store from './stores'
import HomeScreen from './screens/UserScreen'

Navigation.registerComponent('myapp.HomeScreen', () => HomeScreen, store, Provider)
Navigation.startSingleScreenApp({
  screen: { screen: 'myapp.HomeScreen' }
})
