import React, { Component } from 'react';
import { Alert, TextInput, View, FlatList, Text, TouchableOpacity, ScrollView, ImageBackground, Image, Dimensions } from 'react-native';
// import styles from '../styles'
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

class Map extends Component {

  render() {
    const { selectedFestival, areas } = this.props.navigation.state.params
    const areaButtons = areas.map((a) => {
      return <TouchableOpacity key={`areaButton-${a.id}`} style={{top: a.y, left: a.x, margin: 0, padding: 0, position:'absolute'}} onPress={() => {console.log(a.x)}}>
        <Image
          style={{height:48, width:48, borderRadius:50, margin: 0, padding: 0}}
          source={{uri:a.icon}}
          onPress={()=>{Alert.alert('HI')}}
          onLongPress={()=>{Alert.alert(`long press ${a.name}`)}}/>
        </TouchableOpacity>
    })

    return (
      <ScrollView style={{flex:1, backgroundColor: 'transparent' }}>
       <View>
           <Image
            style={{ position: 'absolute', top:0, left:0,  height:500, maxHeight:height, width:'100%'}}
            source={{uri:selectedFestival.map_img}}
            resizeMode='contain' />
       </View>
        <View style={{ flex:1 }}>
          {areaButtons}
        </View>
     </ScrollView>
    );
  }

}

export default Map
