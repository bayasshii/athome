import React from 'react';
import { StatusBar } from 'react-native';
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Permissions from 'expo-permissions'
import * as SQLite from 'expo-sqlite';
import * as Location from 'expo-location';

import HomeLocation from './src/HomeLocation'
import { LogAtHome } from './src/LogAtHome'
import { ReturnHomeLocation } from './src/API/ReturnHomeLocation'

import MainCircle from './src/styled-components/MainCircle'
import { Body, ScrollView } from './src/styled-components/Body'


const LOCATIONDB = SQLite.openDatabase('location43');
const TaskName = 'BACKGROUNDTASK';

TaskManager.defineTask(TaskName, async () => {
  try {
    // これが実行されてほしい。
    // これにsetStateHomeLocation()入れたい。
    console.log("定義したタスク実行されたで！！！")
    let homeLocation = await ReturnHomeLocation(LOCATIONDB)
    // ここで呼ぶ時はデータベースに保存する。一定間隔で保存する。
    let currentDate = await LogAtHome(LOCATIONDB, homeLocation[1], homeLocation[2], true)
    await HomeScreen.setStateCurrentLocation(currentDate[0], currentDate[1], currentDate[2], currentDate[3])
    return BackgroundFetch.Result.NewData;
  }
  catch (error) {
    return BackgroundFetch.Result.Failed;
  }
});

BackgroundFetch.registerTaskAsync(TaskName);
BackgroundFetch.setMinimumIntervalAsync(10);

//Location.startLocationUpdatesAsync(TaskName)


export default class HomeScreen extends React.Component {
  state = {
    isHomeLocation: false,
    isAtHome: true,
    st_date: "null",
    en_date: "null",
    total_hour: "0",
    isLocationPermitted: false,
  };

  // 位置情報とるためのpermission設定
  async _confirmLocationPermission () {
    const permissionIsValid = (permission) => {
      if (permission.status !== 'granted') return false
      if (Platform.OS !== 'ios') return true
      return permission.permissions.location.ios.scope === 'always'
    }
    const permission = await Permissions.getAsync(Permissions.LOCATION)
    if (permissionIsValid(permission)) return true
    const askResult = await Permissions.askAsync(Permissions.LOCATION)
    return permissionIsValid(askResult)
  }

  // homeLocationから帰ってきた値を入れる関数
  async setStateHomeLocation() {
    let homeLocation = await ReturnHomeLocation(LOCATIONDB)
    await this.setState({
      isHomeLocation: homeLocation[0],
      homeLatitude: homeLocation[1],
      homeLongitude: homeLocation[2],
    })

    // 現在のデータをsetStateするここでやらなHomeLocationで値更新できひん。
    // ここで呼ぶ時はデータベースに保存せんようにする
    let currentDate = await LogAtHome(LOCATIONDB, this.state.homeLatitude, this.state.homeLongitude, false)
    this.setStateCurrentLocation(currentDate[0], currentDate[1], currentDate[2], currentDate[3])
  }

  // LogAtHomeから帰ってきた値を入れる関数
  async setStateCurrentLocation(isAtHome, st_date, en_date, total_hour) {
    console.log("LogAtHomeの値stateにsetしたで！")
    await this.setState({
      isAtHome: isAtHome,
      st_date: st_date,
      en_date: en_date,
      total_hour: total_hour
    })
  }

  async componentDidMount() {
    // 位置情報の権限取得
    if(!this.state.isLocationPermitted){
      this.setState({
        isLocationPermitted: await this._confirmLocationPermission()
      })
    }

    // まずhomeLocationをsetState
    await this.setStateHomeLocation()

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
