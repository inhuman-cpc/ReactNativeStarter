import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'
import {Container, Header, Body, Content, Title, Left, Right, Icon, Button} from 'native-base'

@inject('userStore')
@observer
export default class SettingsScreen extends Component {
  static propTypes = {
    userStore: PropTypes.object,
    navigation: PropTypes.object
  }

  render () {
    const { userStore, navigation } = this.props
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

        <Content>
          <Text>Hi, {userStore.username}! Your profile has been updated.</Text>
          Button
        </Content>
      </Container>
    )
  }
}
