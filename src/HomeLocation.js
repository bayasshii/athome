import React from 'react';
import { CircleBox, CircleBoxButton } from './styled-components/CircleBox.js'
import * as Location from 'expo-location';
import { LogAtHome } from './LogAtHome'

export default class HomeLocation extends React.Component {
  state = {
    homeLatitude: null,
    homeLongitude:null,
  };

  async componentDidMount() {
    const homeLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
    const homeLatitude = JSON.stringify(homeLocation.coords.latitude)
    const homeLongitude = JSON.stringify(homeLocation.coords.longitude)
    // Logの方にも入れとく。何にも値がないとよくないので。
    LogAtHome(this.props.LOCATIONDB, homeLatitude, homeLongitude)
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
