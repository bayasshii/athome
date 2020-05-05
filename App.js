import React from 'react';
import { StatusBar } from 'react-native';
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as SQLite from 'expo-sqlite';
import HomeLocation from './src/HomeLocation'
import MainCircle from './src/MainCircle'
import { returnIsAtHome } from './src/isAtHome'
import { Body, ScrollView } from './src/styled-components/Body.js'


const LOCATIONDB = SQLite.openDatabase('location16');

export default class HomeScreen extends React.Component {
  state = {
    homeLatitude: null,
    homeLongitude: null,
    currentLatitude: null,
    currentLongitude:null,
    isHomeLocation: false,
    isAtHome: false,
  };

  setStateHomeLocation() {
    LOCATIONDB.transaction(tx => {
      tx.executeSql('SELECT * FROM homeLocation;', [], (tx, results) => {
        const rows = results.rows.item(0);
        this.setState({
          isHomeLocation: Boolean(rows),
          homeLatitude: rows.latitude,
          homeLongitude: rows.longitude,
        })
      })
    })
  }

  setStateCurrentLocation() {
    // 五分に一回位置情報返すAPIでこれ動かしてコンポーネント更新したい
    this.setState({
      currentLatitude: 333,
      currentLongitude: 132,
    })
  }

  async componentDidMount() {
    this.setStateHomeLocation();
    this.setStateCurrentLocation();

    let homeLatitude = String(Math.abs(this.state.homeLatitude))
    let homeLongitude = String(Math.abs(this.state.homeLongitude))
    let currentLatitude = String(Math.abs(this.state.currentLatitude))
    let currentLongitude = String(Math.abs(this.state.currentLongitude))
    this.setState({
      isAtHome: returnIsAtHome(homeLatitude, homeLongitude, currentLatitude, currentLongitude)
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
            {this.state.isHomeLocation ?
              <MainCircle
                st_date="4/10"
                ed_date="5/20"
                total_hour="200"
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
