import React, { Component } from 'react';
import { TextInput, View, FlatList, Text, Button, ScrollView, ImageBackground } from 'react-native';

import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
      },
});

class Map extends Component {

  render() {
    const { selectedFestival } = this.props.navigation.state.params

    return (
      // <ImageBackground style={ {styles.imgBackground} }
      //            resizeMode='cover'
      //            source={{uri:selectedFestival.map_img}}>
      //
      // </ImageBackground>
      <Text>Hi</Text>
    );
  }
}

export default Map
