import React, { Component } from 'react'
import { WebView, View, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'
import {Container, Header, Body, Content, Title, Left, Right, Icon, Button} from 'native-base'

function response (requestData) {
  return {
    // 处理失败则返回 false
    success: true,
    // data 可以是任意基本类型
    data: requestData.params % 2 ? 'green' : 'red',
    callbackId: requestData.callbackId
  }
}

@inject('userStore')
@observer
export default class SettingsScreen extends Component {
  static propTypes = {
    userStore: PropTypes.object,
    navigation: PropTypes.object
  }

  handleDataReceived = msgData => {
    let {userStore} = this.props
    userStore.setCounter(msgData.params)
    if (msgData.callbackId) {
      this.myWebView.postMessage(JSON.stringify(response(msgData)))
    }
  }

  onWebViewMessage = event => {
    console.log('Message received from webview')

    let msgData
    try {
      msgData = JSON.parse(event.nativeEvent.data)
    } catch (err) {
      console.warn(err)
      return
    }

    switch (msgData.handler) {
      case 'handleDataReceived':
        this.handleDataReceived(msgData)
        break
    }
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
              <WebView
                source={require('../../libs/index.html')}
                onMessage={this.onWebViewMessage}
                ref={webview => {
                  this.myWebView = webview
                }}
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
