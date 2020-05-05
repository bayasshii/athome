import React from 'react';
import { StatusBar } from 'react-native';
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as SQLite from 'expo-sqlite';
import HomeLocation from './src/HomeLocation'
import MainCircle from './src/MainCircle'
import { returnIsAtHome } from './src/isAtHome'
import { Body, ScrollView } from './src/styled-components/Body.js'


const LOCATIONDB = SQLite.openDatabase('location14');

export default class HomeScreen extends React.Component {
  state = {
    homeLocation: null,
    isAtHome: false,
  };

  setStateHomeLocation() {
    LOCATIONDB.transaction(tx => {
      tx.executeSql('SELECT * FROM homeLocation;', [], (tx, results) => {
        const rows = results.rows.item(0);
        this.setState({
          homeLocation: rows
        })
      })
    })
  }

  async componentDidMount() {
    this.setStateHomeLocation()
    this.setState({
      isAtHome: returnIsAtHome(String(Math.abs(34.581079)),String(Math.abs(135.581079)),String(Math.abs(34.581079)),String(Math.abs(135.574699)))
    })
  }

  render () {
    let color = this.state.isAtHome ? "#7092E7" : "red";
    let text = this.state.isAtHome ? "おうちなう" : "おそとなう";
    return (
      <>
        <StatusBar />
        <ScrollView color={color}>
          <Body>
            {this.state.homeLocation === null ?
              <HomeLocation
                LOCATIONDB={LOCATIONDB}
                setStateHomeLocation={() => { this.setStateHomeLocation(); }}
              />
              :
              <MainCircle
                st_date="4/10"
                ed_date="5/20"
                total_hour="200"
                color={color}
                text={text}
              />
            }
          </Body>
        </ScrollView>
      </>
    )
  }
}
