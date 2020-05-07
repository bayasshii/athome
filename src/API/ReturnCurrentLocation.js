import * as Location from 'expo-location';
export async function ReturnCurrentLocation() {
  /*
  -----------------------------------------------------
  / 現在地の緯度経度返すだけ。
  / データベースに打ち込むのは親のコンポーネントでやる
  / permission系も親要素でやる。
  / 一回許可してくれたのに次から許可解除したパターンもある
  -----------------------------------------------------
  */
  let homeLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
  let latitude = JSON.stringify(homeLocation.coords.latitude)
  let longitude = JSON.stringify(homeLocation.coords.longitude)
  return([String(Math.abs(latitude)),String(Math.abs(longitude))])
}
