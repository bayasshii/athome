export const ReturnDate = (LOCATIONDB) => {
  /*
  -----------------------------------------------------
  / データベースを受け取って
  / 初めの日にちと最後の日にちを返す
  -----------------------------------------------------
  */

  //logAtHomeテーブルの最初を抽出してdateを引っ張ってくる
  ReturnStDate = () => {
    LOCATIONDB.transaction(tx => {
      tx.executeSql('SELECT * FROM logAtHome WHERE id == 1;', [], (_, { rows: { _array } }) => {
        return (_array[0].date)
      }
      )
    })
  }

  //logAtHomeテーブルの最後を抽出してdateを引っ張ってくる
  ReturnEnDate = () => {
    LOCATIONDB.transaction(tx => {
      tx.executeSql('SELECT * FROM logAtHome ORDER BY id DESC LIMIT 1;', [], (_, { rows: { _array } }) => {
        return (_array[0].date);
      })
    })
  }
  /*
  console.log("--------------st_date-----------------------")
  console.log(ReturnStDate())
  console.log(ReturnEnDate())
  console.log("--------------ed_date-----------------------")
  */
  let st_date = "04/20"
  let en_date = "05/30"
  return ([st_date, en_date])
}
