import { getDistance } from 'geolib';
export const returnIsAtHome = (HomeLat, HomeLon, CurrentLat, CurrentLon) => {
  /*
  -----------------------------------------------------
  / 四つの引数をとってboolean値を返すだけの関数
  / 親コンポーネントでそれぞれの値を持ってくる必要がある
  / これを動かすべきはApp.jsじゃなくてLogAtHomeかも
  -----------------------------------------------------
  */
  let dis = getDistance(
    { latitude: HomeLat, longitude: HomeLon },
    { latitude: CurrentLat, longitude: CurrentLon }
  );
  console.log("-------------------------------------")
  console.log("家の情報：緯度"+HomeLat+"/経度"+HomeLon)
  console.log("現在地の情報：緯度"+CurrentLat+"/経度"+CurrentLon)
  console.log("距離："+dis+"m")
  console.log("-------------------------------------")
  let is_atHome = false;
  if(Number(dis) < 500000000000000000000000000) {
    is_atHome = true;
  };
  return is_atHome
}
