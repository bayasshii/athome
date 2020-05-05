import { StyleSheet, View, Text, Button } from 'react-native';
import styled from 'styled-components/native'

export const Body = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin: 50px 20px 40px 20px;
  border-radius: 15px;
`
export const ScrollView = styled.View.attrs(props => ({
    type:'password',
    color: props.color || '#7092E7',
  }))`
  flex: 1;
  background-color: ${props => props.color};
`
