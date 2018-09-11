import React from 'react'
import { TextInput, View} from 'react-native';
import { Text, Button } from 'react-native-elements';


export default class SecretInput extends React.Component {
  state = {
    secret: "",
  }

  render () {
    const { navigation, selectedFestival, setAreas, setEvents, areas, events } = this.props;

    return(
      <View>
        <TextInput
          value={this.state.secret}
          onChangeText={(secret) => {
            this.setState({secret})
          }}
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          placeholder="Enter secret..."
        />
        <Button title="Unlock" onPress={() => {
            this.state.secret.toLowerCase() === selectedFestival.secret.toLowerCase() ?
            this.props.navigation.navigate('FestivalPage', {selectedFestival: selectedFestival, areas: areas, events: events}) : console.log(`${this.state.secret} doesnt equal ${selectedFestival.secret}`)
          }
        }/>
      </View>
    )
  }
}
