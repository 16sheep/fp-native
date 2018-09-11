import React, { Component } from 'react';
import { Alert, TextInput, View, FlatList, TouchableOpacity, ScrollView, ImageBackground, Image, Dimensions, Button } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';

// import styles from '../styles'
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

class Map extends Component {

  state = {
    area: ""
  }

  findAreaEvents = (id) => {
    const events = this.props.navigation.state.params.events.filter((e) => e.area_id === id)
    return events
  }

  convertTime = (time) => {
    let t = new Date(time)
    t = t.toLocaleString().slice(0, -3)
    return t.toLocaleString()
  }

  render() {
    const { selectedFestival, areas, events, setSelectedEvent, setSelectedArea, selectedArea } = this.props.navigation.state.params
    const areaButtons = areas.map((a) => {
      return <TouchableOpacity key={`areaButton-${a.id}`} style={{top: a.y, left: a.x, margin: 0, padding: 0, position:'absolute'}} onPress={() => setSelectedArea(a)}>
        <Image
          style={{height:48, width:48, borderRadius:50, margin: 0, padding: 0}}
          source={{uri:a.icon}}
          />
        </TouchableOpacity>
    })

    return (
      <ScrollView style={{flex:1, backgroundColor: 'white' }}>
       <View>
           <Image
            style={{ position: 'absolute', top:0, left:0,  height:500, maxHeight:height, width:'100%'}}
            source={{uri:selectedFestival.map_img}}
            resizeMode='contain' />
       </View>
        <View style={{ flex:1 }}>
          {areaButtons}
        </View>
        {selectedArea?
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', padding:10, backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
          <Image
            style={{height:200, width:200, margin: 0, padding: 0}}
            source={{uri:selectedArea.icon}}
            />
            <Text h4>{selectedArea.name}</Text>
            <Text>{selectedArea.description}</Text>
            <Button title="close" onPress={() => setSelectedArea("")}/>
            <List width='100%' containerStyle={{marginBottom: 20}}>{
              this.findAreaEvents(selectedArea.id).map((e) => {return <ListItem onPress={() => {setSelectedEvent(e)}} key={`event-button-map${e.id}`} title={`${e.name} | ${this.convertTime(e.time_from)}`}/>})
            }
            </List>
          </View>:null

        }
     </ScrollView>
    );
  }

}

export default Map
