import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, ScrollView} from 'react-native';
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as SQLite from 'expo-sqlite';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'

const LOCATION = SQLite.openDatabase('location1');
const myTaskName = 'myTaskName';

// 新しいデータを挿入するやつ
function insertLocation(latitude, longitude) {
  console.log('今からインソートすんで')
  DB.transaction(tx => {
    tx.executeSql(
      `insert into locations (latitude,longitude) values (?,?);`,
      [latitude, longitude]
    );
  });
  console.log('インソートしたで')
}

// タスクの定義
if (!TaskManager.isTaskDefined(myTaskName)) {
  console.log('taskName定義されてなかったから,これから定義すんで！')
  TaskManager.defineTask(myTaskName, ()=>{
    try {
      console.log("タスク実行されたで！！！")
      insertLocation('10101', '20202');
      return BackgroundFetch.Result.NewData
    } catch (err) {
      return BackgroundFetch.Result.Failed;
    }
  })
  console.log('taskName定義完了！')
}

// バックグラウンドでタスクを動してみる
async function initBackgroundFetch(interval) {
  try {
    console.log("initBackgroundFetch呼び出されたで");
    const options = {
      minimumInterval: interval // in seconds
    };
    console.log("registerTaskAsync呼び出されたで");
    await BackgroundFetch.registerTaskAsync(myTaskName, options);
    /*
    BackgroundFetch.registerTaskAsync(taskName, options).then((a)=>{
      console.log('かいけつ！')
      console.log(a)
      console.log(options)
      console.log(taskName)
      BackgroundFetch.getStatusAsync().then((a)=>{
        console.log('かいけつその２！')
        console.log(a)
        console.log(BackgroundFetch.Status)
      })
    });
    */
  } catch (err) {
    console.log('----------------------------');
    console.log('なんか知らんけどエラーやで');
    console.log(err);
    console.log('----------------------------');
  }
}

export default class HomeScreen extends React.Component {
  state = {
    homeLocation: null,
    homeLatitude: null,
    locationLongitude:null,
    isLocationPermitted: false,
  };

  registerTaskAsync = async () => {
    await BackgroundFetch.registerTaskAsync(myTaskName);
    const status = await BackgroundFetch.getStatusAsync();
    /*
    switch (status) {
      case BackgroundFetch.Status.Restricted:
        alert('Restrict');
        break;
      case BackgroundFetch.Status.Denied:
        alert('Background execution is disabled');
        break;
      case BackgroundFetch.Status.Available:
        alert('Avaible');
        break;
    }
    */
    await BackgroundFetch.setMinimumIntervalAsync(15);
  }

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

  async componentDidMount () {
    // 位置情報の権限取得
    !this.state.isLocationPermitted &&
    this.setState({
      isLocationPermitted: await this._confirmLocationPermission()
    })

    const homeLocation = await Location.getCurrentPositionAsync({});
    const homeLatitude = JSON.stringify(homeLocation.coords.latitude)
    const homeLongitude = JSON.stringify(homeLocation.coords.ongitudee)
    this.setState({
      homeLatitude: homeLatitude,
      homeLongitude: homeLongitude,
    })

    LOCATION.transaction(tx => {
      tx.executeSql(
        'select * from homeLocation;',
        null,
        (_, { rows: { _array } }) => this.setState({homeLocation: _array})
      )
    })
    this.registerTaskAsync();
  }

  insertHomeLocation = (latitude, longitude) => {
    LOCATION.transaction(tx => {
      tx.executeSql(
        `insert into homeLocation (latitude,longitude) values (?,?);`,
        [latitude, longitude]
      );
    });
  }

  _registerHomeLocation = () => {
    LOCATION.transaction(tx =>{
      tx.executeSql(
        'create table if not exists homeLocation (id integer primary key not null, latitude number, longitude number);'
      )
    })
    this.insertHomeLocation(this.state.homeLatitude, this.state.homeLongitude)
    console.log("データベース追加したぜ")
  }

  render () {
    return (
      <>

      </>
    )
  }
}
