import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'
import {Container, Header, Body, Content, Title, Left, Right, Icon, Button} from 'native-base'
import CCWebView from 'components/CCWebView'

@inject('userStore')
@observer
export default class SettingsScreen extends Component {
  static propTypes = {
    userStore: PropTypes.object,
    navigation: PropTypes.object
  }

  render () {
    const { navigation } = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon
                active
                name="arrow-back"
              />
            </Button>
          </Left>
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right />
        </Header>

        <Content contentContainerStyle={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.welcome}>
              <Text>{this.props.userStore.count}</Text>
            </View>
            <View style={styles.webViewContainer}>
              <CCWebView
                source={require('../../libs/index.html')}
              />
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  welcome: {
    flex: 1,
    backgroundColor: 'skyblue'
  },
  webViewContainer: {
    flex: 4
  }
})
