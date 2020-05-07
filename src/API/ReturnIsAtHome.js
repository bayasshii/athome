import { getDistance } from 'geolib';
export const ReturnIsAtHome = (HomeLat, HomeLon, CurrentLat, CurrentLon) => {
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
  let is_atHome = false;
  if(Number(dis) < 5) {
    is_atHome = true;
  };
  return is_atHome
}
