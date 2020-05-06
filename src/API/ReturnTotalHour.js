export const ReturnTotalHour = (LOCATIONDB) => {
  /*
  -----------------------------------------------------
  / データベースを受け取って
  / 合計の在宅時間を返す
  / テーブルからisAtHomeがtrueのやつ抽出して
  / その数*バックグラウンドで動かしてる間隔
  / で行けるはず
  -----------------------------------------------------
  */
  //logAtHomeテーブルからisAtHome==trueの数を引っ張ってくる
  ReturnNumber = () => {
    LOCATIONDB.transaction(tx => {
      tx.executeSql('SELECT * FROM logAtHome WHERE isAtHome == true;', [], (_, { rows: { _array } }) => {
        return (_array.length)
      }
      )
    })
  }

  // ReturnNumber()
  // let background_interval = 5
  // let total_hour = ReturnNumber()*background_interval

  let total_hour = "800"
  return (total_hour)
}
