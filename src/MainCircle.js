import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CircleBox, CircleBoxText } from './styled-components/CircleBox.js'
import styled from 'styled-components/native'

const TopText = styled.Text`
  font-size: 28px;
  font-weight: 800;
  color: #7092E7;
  justify-content: center;
  text-align: center;
`
const MiddleText = styled.Text`
  font-size: 18px;
  text-align: center;
  justify-content: center;
`
const BottomText = styled.Text`
  font-size:18px;
  text-align: center;
  justify-content: center;
`
const BottomTextBold = styled.Text`
  color: #7092E7;
  font-size: 80px;
  font-weight: 800;
`

export default class MainCircle extends React.Component {
  render () {
    return (
      <>
      <CircleBox>
        <CircleBoxText>おうちなう</CircleBoxText>
      </CircleBox>
      <View style={{ paddingTop: 50 }}>
        <TopText>おうちじかん</TopText>
        <MiddleText style={{ paddingTop: 10 }}>{this.props.st_date}~{this.props.ed_date}</MiddleText>
        <BottomText style={{ paddingTop: 20 }}>
          <BottomTextBold>{this.props.total_hour}</BottomTextBold>hour
        </BottomText>
      </View>
      </>
    )
  }
}
