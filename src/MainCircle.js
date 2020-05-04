import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CircleBox } from './styled-components/CircleBox.js'
import styled from 'styled-components/native'

const TopText = styled.Text`
  font-size: 36px;
  font-weight: 800;
  color: #3DA55C;
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
  color: #3DA55C;
  font-size: 60px;
  font-weight: 800;
`

export default class MainCircle extends React.Component {
  render () {
    return (
      <>
      <CircleBox>
        <Text style={styles.circleBox__text}>おうちなう</Text>
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


const styles = StyleSheet.create({
  circleBox__text: {
    fontSize: 36,
    fontWeight: '800',
    color: '#3DA55C',
  }
});
