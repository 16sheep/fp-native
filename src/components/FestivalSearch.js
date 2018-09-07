import React, { Component } from 'react';
import { TextInput, View, FlatList, Text, Button } from 'react-native';
import { getFestivals } from '../adapter/adapter.js'

class FestivalSearch extends Component {

  state = {
    text: 'WORKS??',
    festivals: [],
    selectedFestival: {}
  };

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  findFestival = (id) => {
    return this.state.festivals.find(f => f.id = id )
  }

  selectFestival = (id) => {
    this.setState({
      selectedFestival: this.findFestival(id)
    }, console.log("state after press", this.state))
  }

  componentDidMount () {
    getFestivals()
    .then((festivals) => this.setState({
      festivals: festivals
    }))
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "yellow" }}>
        <TextInput
          value={this.state.text}
          onChange={this.handleChange}
        />
        <FlatList
          data={this.state.festivals}
          renderItem={({item}) => <Button onPress={(item) => {this.selectFestival(item.id)}} title={item.name}/>}
        />
      </View>
    );
  }
}

export default FestivalSearch;
