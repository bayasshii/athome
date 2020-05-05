import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CircleBox, CircleBoxText } from './styled-components/CircleBox.js'
import styled from 'styled-components/native'

const TopText = styled.Text.attrs(props => ({
    type:'password',
    color: props.color || '#7092E7',
  }))`
  font-size: 28px;
  font-weight: 800;
  color: ${props => props.color};
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
const BottomTextBold = styled.Text.attrs(props => ({
    type:'password',
    color: props.color || '#7092E7',
  }))`
  color: ${props => props.color};
  font-size: 80px;
  font-weight: 800;
`

export default class MainCircle extends React.Component {
  render () {
    return (
      <>
      <CircleBox color={this.props.color}>
        <CircleBoxText color={this.props.color}>{this.props.text}</CircleBoxText>
      </CircleBox>
      <View style={{ paddingTop: 50 }}>
        <TopText color={this.props.color}>おうちじかん</TopText>
        <MiddleText style={{ paddingTop: 10 }}>{this.props.st_date}~{this.props.ed_date}</MiddleText>
        <BottomText style={{ paddingTop: 20 }}>
          <BottomTextBold color={this.props.color}>{this.props.total_hour}</BottomTextBold>hour
        </BottomText>
      </View>
      </>
    )
  }
}
