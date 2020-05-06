export const ReturnCurrentLocation = (LOCATIONDB) => {
  /*
  -----------------------------------------------------
  / 現在地の緯度経度返すだけ。
  / データベースに打ち込むのは親のコンポーネントでやる
  / permission系もここでクリアする
  -----------------------------------------------------
  */
  //logAtHomeテーブルからisAtHome==trueの数を引っ張ってくる

  let background_interval = 5
  // let total_hour = ReturnNumber()*background_interval

  let latitude = "30"
  let longitude = "135"
  return ([latitude, loongitude])
}
