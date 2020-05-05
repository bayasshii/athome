import React from 'react';
import { StyleSheet, View, Button} from 'react-native';
import { CircleBox, CircleBoxButton } from './styled-components/CircleBox.js'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'

export default class HomeLocation extends React.Component {
  state = {
    homeLatitude: null,
    homeLongitude:null,
    isLocationPermitted: false,
  };

  async _confirmLocationPermission () {
    const permissionIsValid = (permission) => {
      if (permission.status !== 'granted') return false
      if (Platform.OS !== 'ios') return true
      return permission.permissions.location.ios.scope === 'always'
    }
    const permission = await Permissions.getAsync(Permissions.LOCATION)
    if (permissionIsValid(permission)) return true
    const askResult = await Permissions.askAsync(Permissions.LOCATION)
    return permissionIsValid(askResult)
  }

  async componentDidMount (){
    // 位置情報の権限取得
    !this.state.isLocationPermitted &&
    this.setState({
      isLocationPermitted: await this._confirmLocationPermission()
    })

    const homeLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
    const homeLatitude = JSON.stringify(homeLocation.coords.latitude)
    const homeLongitude = JSON.stringify(homeLocation.coords.longitude)
    this.setState({
      homeLatitude: homeLatitude,
      homeLongitude: homeLongitude,
    })
  }

  insertHomeLocation = (latitude, longitude) => {
    this.props.LOCATIONDB.transaction(tx => {
      tx.executeSql(
        `insert into homeLocation (latitude,longitude) values (?,?);`,
        [latitude, longitude]
      );
    });
    console.log("緯度/"+String(latitude))
    console.log("経度/"+String(longitude))
  }

  _registerHomeLocation = () => {
    this.props.LOCATIONDB.transaction(tx =>{
      tx.executeSql(
        'create table if not exists homeLocation (id integer primary key not null, latitude number, longitude number);'
      )
    })
    this.insertHomeLocation(this.state.homeLatitude, this.state.homeLongitude)
    console.log("データベース追加したぜ")
    // 親コンポーネントのstate変えて画面更新する。
    return this.props.setStateHomeLocation();
  }

  render () {
    return (
      <>
        <CircleBox>
          <CircleBoxButton
            title="自宅を登録してね"
            onPress={this._registerHomeLocation}
          />
        </CircleBox>
      </>
    )
  }
}
