import * as SQLite from 'expo-sqlite';
import * as Location from 'expo-location';
import { ReturnIsAtHome } from './API/ReturnIsAtHome'
import { ReturnDate } from './API/ReturnDate'
import { ReturnTotalHour } from './API/ReturnTotalHour'
// import { ReturnCurrentLocation } from './API/ReturnCurrentLocation'

export const LogAtHome = ( LOCATIONDB, homeLatitude, homeLongitude) => {
  /*
  ---------------------------------
  homeLocationは親からとってくる
  currentLocationをここで取る
  それぞれの値をisAtHomeで計算して返す
  ・・・・・・dateとtotal_hourはそれぞれ関数切り分けるか！！
  ・・・・・・・・・・保守性考えたら現在地のAPIも切り分けるべきでは？？？
  ---------------------------------
  */

  // 家にいるかどうか(isAtHome)の判定
  // ReturnCurrentLocationがライフタイム？の関係でうまくいかぬ
  let currentLatitude = String(Math.abs(30))
  let currentLongitude = String(Math.abs(130))
  let isAtHome = ReturnIsAtHome(homeLatitude, homeLongitude, currentLatitude, currentLongitude)

  // 何日から何日までか(date)定義する
  let st_date = ReturnDate(LOCATIONDB);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth()+1;
  const date = today.getDate();

  let en_date = month+"/"+date;
  let en_date_for_DB =year+"/"+month+"/"+date;

  // 総在宅時間を定義する
  let total_hour = ReturnTotalHour(LOCATIONDB);


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
      [isAtHome, en_date_for_DB]
    );
  });

  return([isAtHome, st_date, en_date, total_hour])
}
