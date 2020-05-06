import * as SQLite from 'expo-sqlite';
import * as Location from 'expo-location';
import { returnIsAtHome } from './isAtHome'

export const LogAtHome = ( LOCATIONDB, homeLatitude, homeLongitude) => {
  /*
  ---------------------------------
  homeLocationは親からとってくる
  currentLocationをここで取る
  それぞれの値をisAtHomeで計算して返す
  ・・・・・・dateとtotal_hourはそれぞれ関数切り分けるか！！
  ---------------------------------
  */

  // 家にいるかどうか(isAtHome)の判定
  let currentLatitude = String(Math.abs(30))
  let currentLongitude = String(Math.abs(130))
  // これをlogAtHomeテーブルにぶちこむ、returnにも返す
  let isAtHome = returnIsAtHome(homeLatitude, homeLongitude, currentLatitude, currentLongitude)

  // 何日から何日までか(date)定義する
  let st_date ="4/10"
  let en_date ="5/22"


  // 総在宅時間を定義する
  let total_hour = "500"


  // logAtHomeテーブルがなければ作る
  LOCATIONDB.transaction(tx =>{
    tx.executeSql(
      'create table if not exists logAtHome (id integer primary key not null, isAtHome boolean, date string);'
    )
  })

  // logAtHomeテーブルの中に値を入れる
  LOCATIONDB.transaction(tx => {
    tx.executeSql(
      `insert into logAtHome (isAtHome, date) values (?,?);`,
      [isAtHome, "04/10"]
    );
  });

  return([isAtHome, st_date, en_date, total_hour])
}
