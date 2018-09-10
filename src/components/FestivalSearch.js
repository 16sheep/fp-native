import React, { Component } from 'react';
import { TextInput, View, FlatList, Text, Button, ScrollView } from 'react-native';
import SecretInput from './SecretInput'
import { getFestivals } from '../adapter/adapter.js'
import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
});


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

  setAreas = (id) => {
    this.setState({
      areas: this.findFestival(id)
    })
  }

  setEvents = (id) => {
    this.setState({
      events: this.findFestival(id)
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
          renderItem={({item}) => <Button style={styles.button} key={`festivalListItem-${item.id}`} onPress={() => {this.selectFestival(item.id)}} title={item.name}/>}
        />
        {this.state.selectedFestival?
        <SecretInput navigation={this.props.navigation} selectedFestival={this.state.selectedFestival}/>
        : null}
      </ScrollView>
    );
  }
}

export default FestivalSearch;
