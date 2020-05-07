import React from 'react';
import { StatusBar } from 'react-native';
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Permissions from 'expo-permissions'
import * as SQLite from 'expo-sqlite';

import HomeLocation from './src/HomeLocation'
import { LogAtHome } from './src/LogAtHome'

import MainCircle from './src/styled-components/MainCircle'
import { Body, ScrollView } from './src/styled-components/Body'


const LOCATIONDB = SQLite.openDatabase('location23');
const TaskName = 'BACKGROUNDTASK';

export default class HomeScreen extends React.Component {
  state = {
    isHomeLocation: false,
    isAtHome: true,
    st_date: "4/20",
    en_date: "5/20",
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

  setStateHomeLocation() {
    LOCATIONDB.transaction(tx => {
      tx.executeSql('SELECT * FROM homeLocation WHERE id == 1;', [], async (_, { rows: { _array } }) => {
        this.setState({
          isHomeLocation: Boolean(_array[0])
        })

        let homeLatitude = String(Math.abs(_array[0].latitude))
        let homeLongitude = String(Math.abs(_array[0].longitude))
        let currentDate = await LogAtHome(LOCATIONDB, homeLatitude, homeLongitude)
        // isAtHome, st_date, en_date, total_hour
        this.setStateCurrentLocation(currentDate[0], currentDate[1], currentDate[2], currentDate[3])
      }
      )
    })
  }

  // バックグラウンドタスクの定義
  difineBackgroundTask(){
    if (!TaskManager.isTaskDefined(TaskName)) {
      console.log('taskName定義されてなかったから,これから定義すんで！')
      TaskManager.defineTask(TaskName, ()=>{
        try {
          // これが実行されてほしい。
          // これにsetStateHomeLocation()入れたい。
          console.log("タスク実行されたで！！！")
          return BackgroundFetch.Result.NewData
        } catch (err) {
          return BackgroundFetch.Result.Failed;
        }
      })
      console.log('taskName定義完了！')
    }
  }

  // 定義したタスクをバックグラウンドに登録
  registerTaskAsync = async () => {
     await BackgroundFetch.registerTaskAsync(TaskName);
     await BackgroundFetch.setMinimumIntervalAsync(15);
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
    // 位置情報の権限取得
    !this.state.isLocationPermitted &&
    this.setState({
      isLocationPermitted: await this._confirmLocationPermission()
    })

    this.setStateHomeLocation();
    this.difineBackgroundTask();
    this.registerTaskAsync();
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
