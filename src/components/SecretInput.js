import React from 'react'
import { TextInput, View, Text, Button } from 'react-native';


export default class SecretInput extends React.Component {
  state = {
    secret: "",
  }

  render () {
    const { navigation, selectedFestival } = this.props;

    return(
      <View>
        <TextInput
          value={this.state.secret}
          onChangeText={(secret) => {
            this.setState({secret}
          }}
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          placeholder="Enter secret..."
        />
        <Button title="Unlock" onPress={() => {
          this.state.secret.toLowerCase() === selectedFestival.secret.toLowerCase() ?
          this.props.navigation.navigate('FestivalPage', {selectedFestival: selectedFestival}) : console.log(`${this.state.secret} doesnt equal ${selectedFestival.secret}`)}
        }/>
      </View>
    )
  }
}
