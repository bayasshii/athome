import * as SQLite from 'expo-sqlite';
import * as Location from 'expo-location';
import { ReturnIsAtHome } from './API/ReturnIsAtHome'
import { ReturnDate } from './API/ReturnDate'
import { ReturnTotalHour } from './API/ReturnTotalHour'
import { ReturnCurrentLocation } from './API/ReturnCurrentLocation'

export async function LogAtHome( LOCATIONDB, homeLatitude, homeLongitude, boolean){
  /*
  ---------------------------------
  homeLocationは親からとってくる
  currentLocationをここで取る
  それぞれの値をisAtHomeで計算して返す
  バックグラウンド から呼ばれた場合データベースに格納する
  ...メモ...
  (関数の命名間違ったなぁ笑、必ずしも保存しないならLogではないような)
  ---------------------------------
  */

  // 家にいるかどうか(isAtHome)の判定
  let currentLocation = await ReturnCurrentLocation()
  let currentLatitude = String(Math.abs(currentLocation[0]))
  let currentLongitude = String(Math.abs(currentLocation[1]))
  let isAtHome = ReturnIsAtHome(homeLatitude, homeLongitude, currentLatitude, currentLongitude)

  // 今日の情報
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth()+1;
  const date = today.getDate();

  let en_date = month+"/"+date;
  let en_date_for_DB =year+"/"+month+"/"+date;

  // componentDidMountの時はデータベースに保存しないように
  if (boolean){
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
    console.log("--------------データベースにほぞん！！-----------------")
  }

  // 何日から何日までか(date)定義する
  let st_date = await ReturnDate(LOCATIONDB);

  // 総在宅時間を定義する
  let total_hour = await ReturnTotalHour(LOCATIONDB);

  return([isAtHome, st_date, en_date, total_hour])
}
