import React from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { View, Text } from 'react-native';
import Home from './src/components/Home'
import FestivalSearch from './src/components/FestivalSearch'
import FestivalPage from './src/components/FestivalPage'
import Map from './src/components/Map'


const RootStack = createStackNavigator(
  {
    Home: Home,
    FestivalList: FestivalSearch,
    FestivalPage: FestivalPage,
    Map: Map,
  },
  {
    initialRouteName: 'Home',
  }
);

AppRegistry.registerComponent('App', () => App);

export default class App extends React.Component {

  render() {
    return <RootStack/>;
  }
}
