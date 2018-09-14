import React, { Component } from 'react';
import { TextInput, View, FlatList, Text, ScrollView, Image, Dimensions } from 'react-native';
import {List, ListItem, Button } from 'react-native-elements'
import SecretInput from './SecretInput'
import { getFestivals } from '../adapter/adapter.js'
import { AsyncStorage } from "react-native"

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
    myFestivals: [],
    toggleSaved: false
  };

  findFestival = (id) => {
    let fest = this.state.festivals.find(f => f.id === id )
    return fest
  }

  findMyFestival = (id) => {
    let fest = this.state.myFestivals.find(f => f.id === id )
    return fest
  }

  selectFestival = (f) => {
    let selectedFestival = this.findFestival(f)
    this.setState({
      selectedFestival: selectedFestival
    })
  }

  selectMyFestival = (f) => {
    let selectedFestival = this.findMyFestival(f)
    this.setState({
      selectedFestival: selectedFestival
    })
  }


  retrieveData = async (key, selectedFestival) => {
    try {
      let festivals = await AsyncStorage.getItem('festivals');
      festivals = JSON.parse(festivals);

      if (festivals !== null) {
        this.success()
      }

     } catch (error) {
       // Error retrieving data
     }
  }

  success = async () => {
    try {
      let myFestivals = await AsyncStorage.getItem('festivals');
      myFestivals = JSON.parse(myFestivals);

      this.setState({
        myFestivals: myFestivals
      })

     } catch (error) {
       console.log("success error", error);
     }
  }



  renderIf = (condition, content) => {
    if (condition) {
        return content;
    } else {
        return null;
    }
  }

  componentDidMount () {
    this.retrieveData()
    getFestivals()
    .then((festivals) => {
        this.setState({
        festivals: festivals
      })
    })
  }


  render() {

    console.log("STATE", this.state);
    const filteredFestivals = this.state.festivals.filter((f) => {
      if (f.name.toLowerCase().includes(this.state.festivalFilter.toLowerCase())) {
        return f
      }
    })

    const myFilteredFestivals = this.state.myFestivals.filter((f) => {
      if (f.name.toLowerCase().includes(this.state.festivalFilter.toLowerCase())) {
        return f
      }
    })

    return (
      <ScrollView style={{backgroundColor:'#7AC7EA',flex: 1, backgroundColor: "white"}}>
      <View>
         <Image style={{ height: 700, width: 375, position: 'absolute', top:0, left:0 }} source={require('./logo.png')} />
      </View>
      <View style={{flex: 1, position: 'absolute', top:315, width:'100%', alignItems:'center'}}>
      <View style={{flex: 1, flexDirection:'row', alignItems:'center', marginBottom: 10}}>
      <Button
        title="My festivals"
        onPress={() => this.setState({toggleSaved:true})}
        buttonStyle={{borderColor:'white',borderWidth:1, borderRadius:3 ,backgroundColor: 'transparent', height: 45}}/>
        />
        <Button
          title="All festivals"
          onPress={() => this.setState({toggleSaved:false})}
          buttonStyle={{borderColor:'white',borderWidth:1, borderRadius:3,backgroundColor: 'transparent', height: 45}}/>
          />
        </View>
        <TextInput
          color="white"
          value={this.state.festivalFilter}
          onChangeText={(festivalFilter) => this.setState({festivalFilter})}
          style={{fontSize:20,height: 50, borderColor: 'white', paddingLeft:20, borderWidth: 1, width:'80%', borderRadius:3, backgroundColor:'white', color:'#666' }}
          placeholder="Search"
        />
        {
          this.state.toggleSaved?
            <List containerStyle={{marginBottom: 20, width:'80%', borderRadius:3, borderColor: 'white', backgroundColor:'transparent'}}>{
              myFilteredFestivals.map((f) => {return <ListItem onPress={() => {
                this.selectMyFestival(f.id)}} key={`festival-list-item-${f.id}`}title={f.name}/>})
            }</List>:
            <List containerStyle={{marginBottom: 20, width:'80%', borderRadius:3, borderColor: 'white', backgroundColor:'transparent'}}>{
              filteredFestivals.map((f) => {return <ListItem onPress={() => {this.selectFestival(f.id)}} key={`festival-list-item-${f.id}`}title={f.name}/>})
            }
            </List>
        }

        </View>
        {this.state.selectedFestival?
        <SecretInput
          setAreas={this.setAreas}
          setEvents={this.setEvents}
          navigation={this.props.navigation}
          selectedFestival={this.state.selectedFestival}
          areas={this.state.areas}
          events={this.state.events}
          selectFestival={this.selectFestival}/>
        : null}
      </ScrollView>

    );
  }
}

export default FestivalSearch;
