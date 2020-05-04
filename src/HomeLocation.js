import React from 'react';
import { StyleSheet, View, Button} from 'react-native';
import { CircleBox } from './styled-components/CircleBox.js'
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

    const homeLocation = await Location.getCurrentPositionAsync({});
    const homeLatitude = JSON.stringify(homeLocation.coords.latitude)
    const homeLongitude = JSON.stringify(homeLocation.coords.longitudee)
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
  }

  _registerHomeLocation = () => {
    this.props.LOCATIONDB.transaction(tx =>{
      tx.executeSql(
        'create table if not exists homeLocation (id integer primary key not null, latitude number, longitude number);'
      )
    })
    this.insertHomeLocation(this.state.homeLatitude, this.state.homeLongitude)
    console.log("データベース追加したぜ")
  }

  render () {
    return (
      <>
        <CircleBox>
          <Button
            title="自宅を登録してね"
            style={styles.circleBox__text}
            onPress={this._registerHomeLocation}
          />
        </CircleBox>
      </>
    )
  }
}


const styles = StyleSheet.create({
  circleBox__text: {
    fontSize: 36,
    fontWeight: '800',
    color: '#3DA55C',
  }
});
