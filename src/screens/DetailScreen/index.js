import React, { Component } from 'react'
import { Text, Button } from 'react-native'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'
import {Container, Header, Body, Content, Icon, Left, Right, Title} from 'native-base'

@inject('homeStore')
@observer
export default class UserScreen extends Component {
  static propTypes = {
    homeStore: PropTypes.object,
    navigation: PropTypes.object
  }

  viewDetail = item => {
    let {homeStore, navigation} = this.props
    homeStore.select(item.id)
    navigation.push('Detail')
  }

  render () {
    const { homeStore, navigation } = this.props
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
          <Text>Item id: {homeStore.selected}</Text>
          <Button onPress={() => navigation.goBack()} title="Go Back" />
        </Content>
      </Container>
    )
  }
}
