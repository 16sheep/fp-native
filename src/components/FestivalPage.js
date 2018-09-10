import React, { Component } from 'react';
import { TextInput, View,Text, Button, ScrollView} from 'react-native';
import {getFestivalAreas, getFestivalEvents} from '../adapter/adapter.js'


class FestivalPage extends Component {

  state={
    areas: [],
    events: []
  }

  componentDidMount() {
    getFestivalAreas(this.props.navigation.state.params.selectedFestival.id).then(areas => this.setState({areas}))
    getFestivalEvents(this.props.navigation.state.params.selectedFestival.id).then(events => this.setState({events}))
  }

  render() {
    const { selectedFestival} = this.props.navigation.state.params
    const { areas, events } = this.state

    return (
      <ScrollView style={{ height: 10, flex: 1, backgroundColor: "green" }}>
        <Text>{selectedFestival.name}</Text>
        <Button title="Map" onPress={() => {
          this.props.navigation.navigate('Map', {selectedFestival: selectedFestival, areas: areas })}
        }/>
      </ScrollView>
    );
  }
}

export default FestivalPage;
