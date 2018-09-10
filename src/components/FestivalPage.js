import React, { Component } from 'react';
import { TextInput, View, FlatList, Text, Button, ScrollView} from 'react-native';

class FestivalPage extends Component {

  render() {
    const { selectedFestival } = this.props.navigation.state.params

    return (
      <ScrollView style={{ height: 10, flex: 1, backgroundColor: "green" }}>
        <Text>{selectedFestival.name}</Text>
        <Button title="Map" onPress={() => {
          this.props.navigation.navigate('Map', {selectedFestival: selectedFestival})}
        }/>

      </ScrollView>
    );
  }
}

export default FestivalPage;
