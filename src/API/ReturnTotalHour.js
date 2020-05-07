export async function ReturnTotalHour(LOCATIONDB) {
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
  return(
    await (() =>
    new Promise(resolve => {
      LOCATIONDB.transaction(tx => {
        tx.executeSql('SELECT * FROM logAtHome WHERE isAtHome == true;', [], (_, { rows: { _array } }) => {
          resolve(_array.length)
        }
        )
      })
    }))()
  )
}
