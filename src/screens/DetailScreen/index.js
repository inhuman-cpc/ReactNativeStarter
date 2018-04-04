import React, { Component } from 'react'
import { Text, Button as NativeButton } from 'react-native'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'
import {Container, Header, Body, Content, Title, Left, Right, Icon, Button} from 'native-base'

@inject('homeStore')
@observer
export default class DetailScreen extends Component {
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
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon
                active
                name="arrow-back"
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
        </Content>
      </Container>
    )
  }
}
