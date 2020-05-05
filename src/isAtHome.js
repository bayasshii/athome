import { getDistance } from 'geolib';
export const returnIsAtHome = (HomeLat, HomeLon, Lat, Lon) => {
  let dis = getDistance(
    { latitude: HomeLat, longitude: HomeLon },
    { latitude: Lat, longitude: Lon }
  );
  console.log("-------------------------------------")
  console.log("家の情報：緯度"+HomeLat+"/経度"+HomeLon)
  console.log("現在地の情報：緯度"+Lat+"/経度"+Lon)
  console.log("距離："+dis+"m")
  console.log("-------------------------------------")
  let is_atHome = false;
  if(Number(dis) < 500000000000000) {
    is_atHome = true;
  };
  return is_atHome
}
