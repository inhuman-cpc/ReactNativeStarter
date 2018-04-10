import React, { Component } from 'react'
import { WebView, Alert } from 'react-native'
import handlers from './handlers'

export default class SettingsScreen extends Component {
  state = {
    url: ''
  }

  onWebViewMessage = event => {
    console.log('Message received from webview')

    let requestData
    try {
      requestData = JSON.parse(event.nativeEvent.data)
    } catch (err) {
      console.error(err)
      return
    }

    // handler, callbackId, params
    let {handler, callbackId, params} = requestData
    if (handlers[handler]) {
      handlers[handler](params, (responseData) => {
        if (callbackId) {
          // success, callbackId, data
          this.myWebView.postMessage(JSON.stringify({
            callbackId,
            ...responseData
          }))
        }
      })
    } else {
      console.warn(`Not support handler : ${handler}`)
    }
  }

  onNavChange = webviewState => {
    this.setState({
      url: webviewState.url
    })
    Alert.alert(webviewState.url)
  }

  render () {
    return (
      <WebView
        {...this.props}
        onMessage={this.onWebViewMessage}
        onNavigationStateChange={this.onNavChange}
        ref={webview => {
          this.webview = webview
        }}
      />
    )
  }
}
