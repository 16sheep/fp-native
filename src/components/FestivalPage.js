import React, { Component } from 'react';
import { Dimensions, TextInput, View, ScrollView, Image} from 'react-native';
import { ButtonGroup, List, ListItem, Text, Button} from 'react-native-elements'
import {getFestivalAreas, getFestivalEvents, getFestivalCategories} from '../adapter/adapter.js'
import { AsyncStorage } from "react-native"

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
    selectedCategory: "",
    saved:false
  }

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex})
  }

  setStorageData = (key, newItem, func) => {
    AsyncStorage.setItem(key, newItem, () => _retrieveData(key))
  }

  retrieveData = async (key, selectedFestival) => {
  try {
    const value = await AsyncStorage.getItem(key);
    value = JSON.parse(value);
    console.log("VALUE", value);
    console.log("lastlog", selectedFestival);


    let foundFestival = {}

    if (value) {
      foundFestival = value.find((f) => {
        console.log("f.id", f)
        return f.id === selectedFestival.id
      })
    }
    console.log("found", foundFestival)

    if (value !== null && foundFestival ) {
        console.log("on if fail")
        this.success(selectedFestival)
    }
    else {
      console.log("on fail else");
      this.fail(selectedFestival)
    }
  } catch (error) {
     // Error retrieving data
   }
}

  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }

  success = async (selectedFestival) => {
    ("GOING TO AS")
    try {
      let events = await AsyncStorage.getItem('events');
      events = JSON.parse(events);

      let areas = await AsyncStorage.getItem('areas');
      areas = JSON.parse(areas);
      const uniqueCats = {}

      const festivalEvents = events.filter((e) => e.festival_id === selectedFestival.id)
      const festivalAreas = areas.filter((a) => a.festival_id === selectedFestival.id)
      console.log(festivalEvents[1])
      const filteredCategories = festivalEvents.filter((c) => {
          return c.category
      })



      console.log(uniqueCats);
      this.setState({
        events: festivalEvents,
        areas: festivalAreas,
        categories: uniqueCats
      })

     } catch (error) {
       console.log("success error", error);
     }
  }

  fail = (selectedFestival) => {
    console.log("GOING TO API");
    getFestivalAreas(selectedFestival.id)
    .then(areas => this.setState({areas}))

    getFestivalEvents(selectedFestival.id)
    .then(events => this.sortByDate(events))
    .then(events => this.setState({events}))

    getFestivalCategories(selectedFestival.id)
    .then(categories => this.setState({categories: Object.keys(categories)}))
  }

  getStorageData = async (key, item) => {
    try {
      const value = await AsyncStorage.getItem(key);
      const valueCopy = JSON.parse(value);

      const sameItem = valueCopy.find(
        (i => {
          console.log("i", i)
          console.log("item", item)

          return i.id === item.id
        })
      )

      if (sameItem) {
        var index = valueCopy.indexOf(sameItem);
          if (index > -1) {

            valueCopy.splice(index, 1);
            valueCopy = [...valueCopy, item]
            this.setStorageData(key, JSON.stringify(valueCopy))
          }
      }
      else {
        valueCopy = [...valueCopy, item]
        this.setStorageData(key, JSON.stringify(valueCopy))
      }
     } catch (error) {
  }
}

getStorageDataArr = async (key, item) => {
  try {
    const value = await AsyncStorage.getItem(key);
    const valueCopy = JSON.parse(value);

    item.forEach(a => {
      const sameItem = valueCopy.find(
        (i => {
          return i.id === a.id
        })
      )

      if (sameItem) {
        var index = valueCopy.indexOf(sameItem);
          if (index > -1) {

            valueCopy.splice(index, 1);
            valueCopy = [...valueCopy, a]
            this.setStorageData(key, JSON.stringify(valueCopy))
          }
      }
      else {
        valueCopy = [...valueCopy, a]
        this.setStorageData(key, JSON.stringify(valueCopy))
      }
    })
  } catch (error) {
}
}




  getItem = (key) => {
    AsyncStorage.getItem(key, (err, result) => {console.log(result)})
  }

  getKeys = () => {
    AsyncStorage.getAllKeys(key, (err, result) => {console.log(result)})
  }

  removeItemsFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('festivals');
    } catch (error) {
      console.log("Error at removeItemFromStorage", error)
    }
  }

  saveFestival = () => {
    const { selectedFestival} = this.props.navigation.state.params
    const { events, areas, categories } = this.state
    console.log("events", events);
    //Get all keys in AS,
    // check if 'festival' in keys
      //If yes get whats in festival value
      //check if selectedFestival id exists in that array of festivals
        //if yes remove it
        //copy the array and push new festival in the array
        //if no copy array and push selectedFestival into it
      // push new festivals array to AS

    AsyncStorage.getAllKeys((err, keys) => {
      if (keys.includes('festivals')) {
        this.getStorageData('festivals', selectedFestival)
        this.getStorageDataArr('events', events)
        this.getStorageDataArr('areas', areas)


        this.getItem('festivals')
      }
      else {
        this.setStorageData('festivals', JSON.stringify([selectedFestival]))
        this.setStorageData('events', JSON.stringify([...events]))
        this.setStorageData('areas', JSON.stringify([...areas]))
      }
    });
  }

  sortByDate = (arr) => {
    const copy = [...arr]
    copy.sort((a,b) => {
      return new Date(a.time_from) - new Date(b.time_from);
    })
    return copy
  }

  componentDidMount() {
    //Implement ifelse based on if festival is saved or not and make a call to api or asyncstorage
    const { selectedFestival } = this.props.navigation.state.params
    console.log("selectedFestivalat mount", selectedFestival);
    this.retrieveData('festivals', selectedFestival)
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

    console.log("categories", categories);

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

    const filteredCategories = categories.filter((c) => {
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


      <View style={{marginLeft: 50, flex: 1, flexDirection:'row', alignItems:'center', marginBottom: 10}}>

      <Button
        title="Save"
        onPress={this.saveFestival}
        textStyle={{color:'#333'}}
        buttonStyle={{borderColor:'gold', borderWidth:1, width:100, borderRadius:3,backgroundColor: 'transparent', height: 45}}/>

        />
        <Button
          title="Remove"
          onPress={() => {this.removeItemsFromStorage()}}
          textStyle={{color:'#333'}}
          buttonStyle={{borderColor:'#333',borderWidth:1, width: 100, borderRadius:3,backgroundColor: 'transparent', height: 45}}/>
          />
        </View>
      </ScrollView>
    );
  }
}

export default FestivalPage;
