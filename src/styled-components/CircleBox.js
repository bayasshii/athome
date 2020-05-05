import { StyleSheet, View, Text, Button } from 'react-native';
import styled from 'styled-components/native'

export const CircleBox = styled.View.attrs(props => ({
    type:'password',
    color: props.color || '#7092E7',
  }))`
  background-color: transparent;
  width: 300px;
  height: 300px;
  border-radius: 300px;
  border-style: solid;
  border-color: ${props => props.color};;
  border-width: 15px;
  justify-content: center;
  align-items: center;
`
export const CircleBoxButton = styled.Button`
  font-size: 36px;
  font-weight: 800;
  color: #7092E7;
`
export const CircleBoxText = styled.Text.attrs(props => ({
    type:'password',
    color: props.color || '#7092E7',
  }))`
  font-size: 42px;
  font-weight: 800;
  color: ${props => props.color};
`
