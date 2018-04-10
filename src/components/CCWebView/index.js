import React, { Component } from 'react'
import { WebView, Alert } from 'react-native'
import URL from 'url-parse'
import handlers from './handlers'

const WHITE_LIST = [
  'localhost'
]

export default class CCWebView extends Component {
  state = {
    hostname: ''
  }

  onWebViewMessage = event => {
    if (WHITE_LIST.indexOf(this.state.hostname) === -1) {
      Alert.alert('Host not allowed.')
      return
    }

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
          this.webview.postMessage(JSON.stringify({
            callbackId,
            ...responseData
          }))
        }
      })
    } else {
      console.warn(`Not support handler : ${handler}`)
    }
  }

  onLoadEnd = e => {
    this.setState({
      hostname: new URL(e.nativeEvent.url).hostname
    })
  }

  render () {
    return (
      <WebView
        {...this.props}
        onMessage={this.onWebViewMessage}
        onLoadEnd={this.onLoadEnd}
        ref={webview => {
          this.webview = webview
        }}
      />
    )
  }
}
