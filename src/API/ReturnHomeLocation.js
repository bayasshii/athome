export async function ReturnHomeLocation(LOCATIONDB){
  /*
  -----------------------------------------------------
  / データベースを受け取って
  / 家の緯度経度を返す
  ---------------------
  */
  //logAtHomeテーブルの最初を抽出してdateを引っ張ってくる
  return(
    await (() =>
    new Promise(resolve => {
      LOCATIONDB.transaction(tx => {
        tx.executeSql('SELECT * FROM homeLocation WHERE id == 1;', [], async (_, { rows: { _array } }) => {
          let isHomeLocation = Boolean(_array[0])
          let homeLatitude = String(Math.abs(_array[0].latitude))
          let homeLongitude = String(Math.abs(_array[0].longitude))
          resolve([isHomeLocation, homeLatitude, homeLongitude])
        })
      })
    }))()
  )
}
