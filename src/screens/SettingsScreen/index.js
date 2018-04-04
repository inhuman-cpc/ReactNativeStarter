import React, { Component } from 'react'
import { Text, Button } from 'react-native'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'
import {Container, Header, Body, Content, Icon, Left, Right, Title} from 'native-base'

@inject('userStore')
@observer
export default class SettingsScreen extends Component {
  static propTypes = {
    userStore: PropTypes.object,
    navigation: PropTypes.object
  }

  render () {
    const { userStore } = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                active
                name="menu"
              />
            </Button>
          </Left>
          <Body>
            <Title>Detail</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Text>Hi, {userStore.username}! \nYour profile has been updated.</Text>
          <Button onPress={() => this.props.navigation.goBack()} title="Go Back" />
        </Content>
      </Container>
    )
  }
}
