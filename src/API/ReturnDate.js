export async function ReturnDate(LOCATIONDB){
  /*
  -----------------------------------------------------
  / データベースを受け取って
  / 初めの日にちを返す
  / 最後の日にちは親要素で取る
  -----------------------------------------------------
  */
  //logAtHomeテーブルの最初を抽出してdateを引っ張ってくる
  return(
    await (() =>
    new Promise(resolve => {
      LOCATIONDB.transaction(tx => {
        tx.executeSql('SELECT * FROM logAtHome WHERE id == 1;', [], (_, { rows: { _array } }) => {
          resolve(_array[0].date)
        }
        )
      })
    }))()
  )
}
