import React, { Component } from 'react';
import { TextInput, View, FlatList, Text, Button, ScrollView, Image, Dimensions } from 'react-native';
import {List, ListItem } from 'react-native-elements'
import SecretInput from './SecretInput'
import { getFestivals } from '../adapter/adapter.js'


let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

class FestivalSearch extends Component {

  state = {
    festivalFilter: "",
    festivals: [],
    areas: [],
    events: [],
    selectedFestival: null,
    secret: "",
  };

  findFestival = (id) => {
    console.log("FESTIVAL ID", id)
    let fest = this.state.festivals.find(f => f.id === id )
    return fest
  }

  selectFestival = (id) => {
    this.setState({
      selectedFestival: this.findFestival(id)
    })
  }

  setAreas = (areas) => {
    this.setState({
      areas: areas
    })
  }

  setEvents = (events) => {
    this.setState({
      events: events
    })
  }

  renderIf = (condition, content) => {
    if (condition) {
        return content;
    } else {
        return null;
    }
  }

  componentDidMount () {
    getFestivals()
    .then((festivals) => this.setState({
      festivals: festivals
    }))
  }


  render() {
    const filteredFestivals = this.state.festivals.filter((f) => {
      if (f.name.toLowerCase().includes(this.state.festivalFilter.toLowerCase())) {
        return f
      }
    })

    return (
      <ScrollView style={{flex: 1, backgroundColor: "white"}}>
      <View>
         <Image style={{ height: 700, width: 375, position: 'absolute', top:0, left:0 }} source={require('./logo.png')} />
      </View>
      <View style={{flex: 1, position: 'absolute', top:315, width:'100%', alignItems:'center'}}>
        <TextInput
          color="white"
          value={this.state.festivalFilter}
          onChangeText={(festivalFilter) => this.setState({festivalFilter})}
          style={{height: 50, borderColor: 'white', paddingLeft:20, borderWidth: 1, width:'80%', borderRadius:3, backgroundColor:'white', color:'black' }}
          placeholder="Search festivals"
        />

        <List containerStyle={{marginBottom: 20, width:'80%', borderRadius:3, borderColor: 'white', backgroundColor:'transparent'}}>{
          filteredFestivals.map((f) => {return <ListItem onPress={() => {this.selectFestival(f.id)}} key={`festival-list-item-${f}`}title={f.name}/>})
        }
        </List>

        {this.state.selectedFestival?
        <SecretInput
          setAreas={this.setAreas}
          setEvents={this.setEvents}
          navigation={this.props.navigation}
          selectedFestival={this.state.selectedFestival}
          areas={this.state.areas}
          events={this.state.events}/>
        : null}
        </View>
      </ScrollView>

    );
  }
}

export default FestivalSearch;
