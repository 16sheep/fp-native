import React, { Component } from 'react';
import { TextInput, View,Button, ScrollView, Image} from 'react-native';
import { ButtonGroup, List, ListItem, Text} from 'react-native-elements'
import {getFestivalAreas, getFestivalEvents, getFestivalCategories} from '../adapter/adapter.js'


class FestivalPage extends Component {

  state={
    areas: [],
    events: [],
    categories: [],
    eventFilter: "",
    areaFilter: "",
    categoryFilter: "",
    selectedIndex: 0,
    selectedEvent: "",
    selectedArea:"",
    selectedCategory: ""
  }

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex})
  }

  componentDidMount() {
    getFestivalAreas(this.props.navigation.state.params.selectedFestival.id).then(areas => this.setState({areas}))
    getFestivalEvents(this.props.navigation.state.params.selectedFestival.id).then(events => this.setState({events}))
    getFestivalCategories(this.props.navigation.state.params.selectedFestival.id).then(categories => this.setState({categories}))
  }

  findEventArea = (id) => {
    const area = this.state.areas.find((a) => a.id === id)
    return area
  }

  findAreaEvents = (id) => {
    const events = this.state.events.filter((e) => e.area_id === id)
    return events
  }

  render() {

    const { selectedFestival} = this.props.navigation.state.params
    const { areas, events, categories, selectedIndex, areaFilter, eventFilter, categoryFilter, selectedEvent, selectedArea, selectedCategory } = this.state
    const buttons = ['EVENTS', 'CATEGORIES', 'AREAS', "MAP"]
    const cats = Object.keys(categories) ? Object.keys(categories):[]

    const filteredEvents = events.filter((e) => {
      if (e.name.toLowerCase().includes(eventFilter.toLowerCase())) {
        return e
      }
    })

    const filteredCategories = cats.filter((c) => {
      if (c.toLowerCase().includes(categoryFilter.toLowerCase())) {
        return c
      }
    })

    const filteredAreas = areas.filter((a) => {
      if (a.name.toLowerCase().includes(areaFilter.toLowerCase())) {
        return a
      }
    })
    return (
      <ScrollView style={{ height: 10, flex: 1, backgroundColor: "white" }}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 50}}
        />
        {
          selectedIndex === 3 ?
            this.props.navigation.navigate('Map', {selectedFestival: selectedFestival, areas: areas }):null
        }
        {
          selectedIndex === 1?
            <ScrollView>
            {selectedCategory?
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', padding:10 }}>
                <Text h4>{selectedCategory}</Text>
                <Button title="close" onPress={() => this.setState({selectedArea: ""})}/>
              </View>:null
            }
              <TextInput
                value={categoryFilter}
                onChangeText={(categoryFilter) => this.setState({categoryFilter})}
                style={{height: 40, borderColor: 'black', borderWidth: 1}}
                placeholder="Search categories"
              />
                <List containerStyle={{marginBottom: 20}}>{
                  filteredCategories.map((c) => {return <ListItem onPress={() => this.setState({selectedCategory: c})} key={`category-list-item-${c}`}title={c}/>})
                }
                </List>
            </ScrollView>:null
        }
        {
          selectedIndex === 2?
            <ScrollView>
            {selectedArea?
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', padding:10 }}>
              <Image
                style={{height:200, width:200, margin: 0, padding: 0}}
                source={{uri:selectedArea.icon}}
                />
                <Text h4>{selectedArea.name}</Text>
                <Text>{selectedArea.description}</Text>
                <Button title="close" onPress={() => this.setState({selectedArea: ""})}/>
                <List width='100%' containerStyle={{marginBottom: 20}}>{
                  this.findAreaEvents(selectedArea.id).map((e) => {return <ListItem onPress={() => this.setState({selectedEvent: e, selectedIndex: 0})} key={`event-button-${e.id}`} title={e.name}/>})
                }
                </List>
              </View>:null
            }
            <TextInput
              value={areaFilter}
              onChangeText={(areaFilter) => this.setState({areaFilter})}
              style={{height: 40, borderColor: 'black', borderWidth: 1}}
              placeholder="Search areas"
            />
              <List containerStyle={{marginBottom: 20}}>{
                filteredAreas.map((a) => {return <ListItem onPress={() => this.setState({selectedArea: a})} key={`area-list-item-${a.id}`}title={a.name}/>})
              }
              </List>

            </ScrollView>:null
        }
        {
          selectedIndex === 0?
            <ScrollView>
            {selectedEvent?
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', padding:10 }}>
                <Text h1>{selectedEvent.name}</Text>
                <Button onPress={()=> this.setState({selectedIndex: 1, selectedCategory: selectedEvent.category }) } title={selectedEvent.category}/>
                <Text>{selectedEvent.description}</Text>
                <Button onPress={()=> this.setState({selectedIndex: 2, selectedArea: this.findEventArea(selectedEvent.area_id) }) } title={this.findEventArea(selectedEvent.area_id).name}/>
                <Button title="close" onPress={() => this.setState({selectedEvent: ""})}/>
              </View>:null
            }
            <TextInput
              value={eventFilter}
              onChangeText={(eventFilter) => this.setState({eventFilter})}
              style={{height: 40, borderColor: 'black', borderWidth: 1}}
              placeholder="Search events"
            />
              <List containerStyle={{marginBottom: 20}}>{
                filteredEvents.map((e) => {return <ListItem onPress={() => this.setState({selectedEvent: e})} key={`event-list-item-${e.id}`}title={e.name}/>})
              }
              </List>
            </ScrollView>:null
        }

      </ScrollView>
    );
  }
}

export default FestivalPage;
