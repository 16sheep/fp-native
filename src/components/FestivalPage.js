import React, { Component } from 'react';
import { Dimensions, TextInput, View, ScrollView, Image} from 'react-native';
import { ButtonGroup, List, ListItem, Text, Button} from 'react-native-elements'
import {getFestivalAreas, getFestivalEvents, getFestivalCategories} from '../adapter/adapter.js'

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

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

  findCategoryEvents = (category) => {
    const events = this.state.events.filter((e) => e.category === category)
    return events
  }

  convertTime = (time) => {
    let t = new Date(time)
    t = t.toLocaleString().slice(0, -3)
    return t.toLocaleString()
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

    const setSelectedEvent = (e) => {
      this.setState({
        selectedEvent: e,
        selectedIndex: 0
      }, () => {
        this.props.navigation.navigate('FestivalPage')
      })
    }

    const setSelectedArea = (a) => {
      this.setState({
        selectedArea: a
      })
    }

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
      <ScrollView style={{ width:'100%', flex: 1, backgroundColor: "white" }}>
      {
        selectedIndex === 3 ?
          this.props.navigation.navigate('Map', {selectedArea: selectedArea, setSelectedArea: setSelectedArea, selectedFestival: selectedFestival, areas: areas, events: events, setSelectedEvent: setSelectedEvent }):null
      }
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 50, borderColor:'#fd5c63'}}
          innerBorderStyle={{color:'#fd5c63'}}
          selectedButtonStyle={{backgroundColor:'#fd5c63'}}
          buttonStyle={{backgroundColor:'white', borderLeftColor:'#fd5c63'}}
          textStyle={{fontSize:12, color: '#fd5c63'}}
          selectedTextStyle={{color:"white"}}
        />
        {
          selectedIndex === 1?
            <ScrollView>
            {selectedCategory?
              <View style={{elevation: 1, marginLeft:10, width:'95%', flex: 1, flexDirection: 'column', alignItems: 'center', padding:10, borderWidth:1, borderColor:'#999', borderRadius:3}}>
                <Text h4>{selectedCategory}</Text>

                <List width='100%' containerStyle={{marginBottom: 20}}>{
                  this.findCategoryEvents(selectedCategory).map((e) => {return <ListItem onPress={() => this.setState({selectedEvent: e, selectedIndex: 0})} key={`event-button-cat${e.id}`} title={`${e.name} | ${this.convertTime(e.time_from)}`}/>})
                }
                </List>
                <Button
                icon={{
                        name: 'close',
                        size: 30,
                        color: '#333'
                      }}
                  onPress={() => this.setState({selectedCategory: ""})}
                  buttonStyle={{backgroundColor: 'white', height: 50}}/>
                  />
              </View>:null
            }
            <View style={{width:'100%', alignItems:'center'}}>
              <TextInput
                value={categoryFilter}
                onChangeText={(categoryFilter) => this.setState({categoryFilter})}
                style={{backgroundColor:'white', color:'white', height: 75, borderColor: 'white', paddingLeft:20, borderWidth: 1, width:'90%', borderRadius:3, color:'#333', fontSize:30}}
                placeholder="Search categories"
              />
                <List containerStyle={{marginBottom: 20, width:'90%', borderRadius:3, borderColor: 'white', backgroundColor:'transparent'}}>{
                  filteredCategories.map((c) => {return <ListItem containerStyle={{ borderBottomColor: '#fd5c63', backgroundColor:'transparent'}} onPress={() => this.setState({selectedCategory: c})} key={`category-list-item-${c}`}title={c}/>})
                }
                </List>
              </View>
            </ScrollView>:null
        }
        {
          selectedIndex === 2?
            <ScrollView>
            {selectedArea?
              <View style={{elevation: 1, marginLeft:10, width:'95%', flex: 1, flexDirection: 'column', alignItems: 'center', padding:10, borderWidth:1, borderColor:'#999', borderRadius:3}}>
              <Image
                style={{height:200, width:200, margin: 0, padding: 0}}
                source={{uri:selectedArea.icon}}
                />
                <Text h4>{selectedArea.name}</Text>
                <Text style={{textAlign:'center'}}>{selectedArea.description}</Text>

                <List width='100%' containerStyle={{marginBottom: 20}}>{
                  this.findAreaEvents(selectedArea.id).map((e) => {return <ListItem onPress={() => this.setState({selectedEvent: e, selectedIndex: 0})} key={`event-button-${e.id}`} title={`${e.name} | ${this.convertTime(e.time_from)}`}/>})
                }
                </List>
                <Button
                icon={{
                        name: 'close',
                        size: 30,
                        color: '#333'
                      }}
                  onPress={() => this.setState({selectedArea: ""})}
                  buttonStyle={{backgroundColor: 'white', height: 50}}/>
                  />
              </View>:null
            }
            <View style={{width:'100%', alignItems:'center'}}>
            <TextInput
              value={areaFilter}
              onChangeText={(areaFilter) => this.setState({areaFilter})}
              style={{borderWidth:1, borderBottomColor:'#FFD700',backgroundColor:'white', color:'white', height: 75, borderColor: 'white', paddingLeft:20, borderWidth: 1, width:'90%', borderRadius:3, color:'#333', fontSize:30}}
              placeholder="Search areas"
            />
              <List containerStyle={{marginBottom: 20, width:'90%', borderRadius:3, borderColor: 'white', backgroundColor:'transparent'}}>{
                filteredAreas.map((a) => {return <ListItem containerStyle={{ borderBottomColor: '#fd5c63', backgroundColor:'transparent'}} onPress={() => this.setState({selectedArea: a})} key={`area-list-item-${a.id}`}title={a.name}/>})
              }
              </List>
              </View>
            </ScrollView>:null
        }
        {
          selectedIndex === 0?
            <ScrollView>
            {selectedEvent?
              <View style={{elevation: 1, marginLeft:10, width:'95%', flex: 1, flexDirection: 'column', alignItems: 'center', padding:10, borderWidth:1, borderColor:'#999', borderRadius:3}}>
                <Text h1>{selectedEvent.name}</Text>
                <Text>{`${this.convertTime(selectedEvent.time_from)} - ${this.convertTime(selectedEvent.time_until)}`}</Text>
                <View
                    style={{
                      width:'100%',
                      borderBottomColor: '#FFD700',
                      borderBottomWidth: 1,
                      margin:10
                    }}
                  />
                <View style={{flex: 1, flexDirection: 'row', width:'90%', justifyContent:'space-evenly'}}>
                  <Button
                    onPress={()=> this.setState({ selectedIndex: 1, selectedCategory: selectedEvent.category }) }
                    title={selectedEvent.category}
                    textStyle={{color: 'white'}}
                    buttonStyle={{backgroundColor: '#7AC7EA', height: 45, borderRadius:3, margin:10,paddingLeft:30, paddingRight:30}}/>

                  <Button
                    onPress={()=> this.setState({selectedIndex: 2, selectedArea: this.findEventArea(selectedEvent.area_id) }) }
                    title={this.findEventArea(selectedEvent.area_id).name}
                    textStyle={{color: 'white'}}
                    buttonStyle={{backgroundColor: '#7AC7EA',  paddingLeft:30, paddingRight:30,height: 45 ,margin:10, borderRadius:3}}/>
                </View>
                <Text style={{textAlign: 'center'}}>{selectedEvent.description}</Text>
                <Button
                icon={{
                        name: 'close',
                        size: 30,
                        color: '#333',
                      }}
                  onPress={() => this.setState({selectedEvent: ""})}
                  buttonStyle={{backgroundColor: 'white', height: 50, margin:10}}/>
                  />
              </View>:null
            }
            <View style={{width:'100%', alignItems:'center'}}>
            <TextInput
              value={eventFilter}
              onChangeText={(eventFilter) => this.setState({eventFilter})}
              style={{backgroundColor:'white', color:'white', height: 75, borderColor: 'white', paddingLeft:20, borderWidth: 1, width:'90%', borderRadius:3, color:'#333', fontSize:30}}
              placeholder="Search events"
            />
              <List containerStyle={{marginBottom: 20, width:'90%', borderRadius:3, borderColor: 'white', backgroundColor:'transparent'}}>{
                filteredEvents.map((e) => {return <ListItem containerStyle={{ borderBottomColor: '#fd5c63', backgroundColor:'transparent'}} onPress={() => this.setState({selectedEvent: e})} key={`event-list-item-${e.id}`}title={`${e.name} | ${this.convertTime(e.time_from)}`}/>})
              }
              </List>
              </View>
            </ScrollView>:null
        }

      </ScrollView>
    );
  }
}

export default FestivalPage;
