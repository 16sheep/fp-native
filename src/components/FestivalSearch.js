import React, { Component } from 'react';
import { TextInput, View, FlatList, Text, Button, ScrollView } from 'react-native';
import SecretInput from './SecretInput'
import { getFestivals } from '../adapter/adapter.js'



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
      <ScrollView style={{ height: 10, flex: 1, backgroundColor: "yellow" }}>
        <TextInput
          value={this.state.festivalFilter}
          onChangeText={(festivalFilter) => this.setState({festivalFilter})}
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          placeholder="Search festivals"
        />
        <FlatList
          data={this.state.festivalFilter ? filteredFestivals : this.state.festivals}
          renderItem={({item}) => <Button
            key={`festivalListItem-${item.id}`}
            onPress={() => {this.selectFestival(item.id)}}
            title={item.name}/>}
        />
        {this.state.selectedFestival?
        <SecretInput
          setAreas={this.setAreas}
          setEvents={this.setEvents}
          navigation={this.props.navigation}
          selectedFestival={this.state.selectedFestival}
          areas={this.state.areas}
          events={this.state.events}/>
        : null}
      </ScrollView>

    );
  }
}

export default FestivalSearch;
