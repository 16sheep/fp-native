import React, { Component } from 'react';
import { TextInput, View, FlatList, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
// import styles from '../styles'

class Map extends Component {

  render() {
    const { selectedFestival, areas } = this.props.navigation.state.params
    const areaButtons = areas.map((a) => {
      return <TouchableOpacity key={`areaButton-${a.id}`} style={{marginTop: a.y, marginLeft: a.x}} onPress={() => {console.log(a.x)}}><Text>{a.name}</Text></TouchableOpacity>
    })

    return (
      <ImageBackground style={{width: '100%', height: '100%', flex: 1}}
                resizeMode='cover'
                source={{uri:selectedFestival.map_img}}>
        <View style={{width: '100%', height: '100%', flex: 1}}>
          {areaButtons}
        </View>
     </ImageBackground>
    );
  }

}

export default Map
