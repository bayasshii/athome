import React from 'react';
import { StatusBar } from 'react-native';
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as SQLite from 'expo-sqlite';
import HomeLocation from './src/HomeLocation'
import MainCircle from './src/MainCircle'
import { LogAtHome } from './src/LogAtHome'
import { Body, ScrollView } from './src/styled-components/Body.js'


const LOCATIONDB = SQLite.openDatabase('location19');

export default class HomeScreen extends React.Component {
  state = {
    isHomeLocation: false,
    isAtHome: true,
    st_date: "4/20",
    en_date: "5/20",
    total_hour: "0"
  };

  setStateHomeLocation() {
    LOCATIONDB.transaction(tx => {
      tx.executeSql('SELECT * FROM homeLocation WHERE id == 1;', [], (_, { rows: { _array } }) => {
        this.setState({
          isHomeLocation: Boolean(_array[0])
        })
        let homeLatitude = String(Math.abs(_array[0].latitude))
        let homeLongitude = String(Math.abs(_array[0].longitude))
        let currentDate = LogAtHome(LOCATIONDB, homeLatitude, homeLongitude)
        // isAtHome, st_date, en_date, total_hour
        this.setStateCurrentLocation(currentDate[0], currentDate[1], currentDate[2], currentDate[3])
      }
      )
    })
  }

  setStateCurrentLocation(isAtHome, st_date, en_date, total_hour) {
    // LogAtHomeから帰ってきた値を入れるよう
    this.setState({
      isAtHome: isAtHome,
      st_date: st_date,
      en_date: en_date,
      total_hour: total_hour
    })
  }

  async componentDidMount() {
    this.setStateHomeLocation();
  }

  render () {
    let color = this.state.isAtHome ? "#7092E7" : "red";
    let text = this.state.isAtHome ? "おうちなう" : "おそとなう";
    return (
      <>
        <StatusBar />
        <ScrollView color={color}>
          <Body>
            {this.state.isHomeLocation ?
              <MainCircle
                st_date={this.state.st_date}
                ed_date={this.state.en_date}
                total_hour={this.state.total_hour}
                color={color}
                text={text}
              />
              :
              <HomeLocation
                LOCATIONDB={LOCATIONDB}
                setStateHomeLocation={() => { this.setStateHomeLocation(); }}
              />
            }
          </Body>
        </ScrollView>
      </>
    )
  }
}
