import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, ScrollView} from 'react-native';
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as SQLite from 'expo-sqlite';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'
import HomeLocation from './src/HomeLocation'
import MainCircle from './src/MainCircle'

const LOCATION = SQLite.openDatabase('location6');

export default class HomeScreen extends React.Component {
  state = {
    homeLocation: null
  };

  async componentDidMount () {
    LOCATION.transaction(tx => {
      tx.executeSql(
        'select * from homeLocation;',
        null,
        (_, { rows: { _array } }) => this.setState({homeLocation: _array})
      )
    })
    console.log(this.state.homeLocation);
  }


  render () {
    return (
      <>
        <StatusBar />
        <View style={styles.scrollView}>
          <View style={styles.body}>
            {this.state.homeLocation === null ?
              <HomeLocation
                LOCATIONDB={LOCATION}
              />
              :
              <MainCircle
                st_date="4/10"
                ed_date="5/20"
                total_hour="200"
              />
            }
            {this.state.homeLocation !== null &&
              <ScrollView style={styles.wrapStyle}>
                {this.state.homeLocation.map((location) => (
                  <View style={styles.itemStyle} key={location.id.toString()}>
                    <Text style={styles.textStyle}>[{location.id.toString()}]  LT_{location.latitude} / LG_{location.longitude}</Text>
                  </View>
                ))
                }
              </ScrollView>
            }
          </View>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
  },
  scrollView: {
    flex: 1,
  },
  wrapStyle: {
    margin: 0,
    marginTop: 80,
    marginBottom: 40,
  },
  itemStyle: {
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  textStyle: {
    color: '#fff',
  },
});
