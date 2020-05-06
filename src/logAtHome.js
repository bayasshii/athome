import * as SQLite from 'expo-sqlite';
import * as Location from 'expo-location';
import { returnIsAtHome } from './isAtHome'

export const LogAtHome = ( LOCATIONDB, homeLatitude, homeLongitude) => {
  /*
  ---------------------------------
  homeLocationは親からとってくる
  currentLocationをここで取る
  それぞれの値をisAtHomeで計算して返す
  ・・・・・・dateはここじゃなくていい気する、リアルタイムで変わるもんじゃないし・・・・・・
  ---------------------------------
  */

  // テーブルがなければ作る
  LOCATIONDB.transaction(tx =>{
    tx.executeSql(
      'create table if not exists isAtHome (id integer primary key not null, isAtHome boolean, date string);'
    )
  })

  // テーブルの中に値を入れる
  /*
  LOCATIONDB.transaction(tx => {
    tx.executeSql(
      `insert into logAtHome (latitude,longitude) values (?,?);`,
      [latitude, longitude]
    );
  });
  ?
  */
  console.log("------------------------------------")
  console.log(homeLatitude,homeLongitude)
  console.log("------------------------------------")

  /*
  let homeLatitude = String(Math.abs(this.state.homeLatitude))
  let homeLongitude = String(Math.abs(this.state.homeLongitude))
  let currentLatitude = String(Math.abs(this.state.currentLatitude))
  let currentLongitude = String(Math.abs(this.state.currentLongitude))
  this.setState({
    isAtHome: returnIsAtHome(homeLatitude, homeLongitude, currentLatitude, currentLongitude)
  })
  */

  return([true, "5/5", "6/4", "55555"])
}
