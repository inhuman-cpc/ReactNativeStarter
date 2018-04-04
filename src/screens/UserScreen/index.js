import React, { Component } from 'react'
import { Text, Button as NativeButton } from 'react-native'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'
import {Container, Header, Body, Content, Title, Left, Right} from 'native-base'

@inject('userStore')
@observer
export default class UserScreen extends Component {
  static propTypes = {
    userStore: PropTypes.object,
    navigation: PropTypes.object
  }

  updateProfile = () => {
    let { userStore, navigation } = this.props
    let username = userStore.username === 'Warren Buffett' ? 'Berkshire Hathaway' : 'Warren Buffett'
    userStore.changeUsername(username)
    navigation.push('Settings')
  }

  render () {
    const { userStore } = this.props
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>User Home</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Text>Hi, {userStore.username}!</Text>
          <NativeButton onPress={this.updateProfile} title="Update Profile" />
        </Content>
      </Container>
    )
  }
}
