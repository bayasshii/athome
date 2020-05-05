import React from 'react';
import { StyleSheet, View, Button, StatusBar} from 'react-native';
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as SQLite from 'expo-sqlite';
import HomeLocation from './src/HomeLocation'
import MainCircle from './src/MainCircle'
import {isAtHome} from './src/isAtHome'
import { Body, ScrollView } from './src/styled-components/Body.js'


const LOCATIONDB = SQLite.openDatabase('location10');

export default class HomeScreen extends React.Component {
  state = {
    homeLocation: null
  };

  async componentDidMount () {
    LOCATIONDB.transaction(tx => {
      tx.executeSql('SELECT * FROM homeLocation;', [], (tx, results) => {
        const rows = results.rows.item(0);
        this.setState({
          homeLocation: rows
        })
      })
    })
  }

  render () {
    return (
      <>
        <StatusBar />
        <ScrollView>
          <Body>
            {this.state.homeLocation === null ?
              <HomeLocation
                LOCATIONDB={LOCATIONDB}
              />
              :
              isAtHome(
                String(Math.abs(this.state.homeLocation.latitude)),
                String(Math.abs(this.state.homeLocation.longitude)),
                String(Math.abs(34.581079)),
                String(Math.abs(135.574699))
              )
              ?
              <MainCircle
                st_date="4/10"
                ed_date="5/20"
                total_hour="200"
              />
              :
              <MainCircle
                st_date="4/10"
                ed_date="5/20"
                total_hour="8700"
              />
            }
          </Body>
        </ScrollView>
      </>
    )
  }
}
