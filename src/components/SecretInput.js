import React from 'react'
import { TextInput, View, Alert} from 'react-native';
import { Text, Button } from 'react-native-elements';


export default class SecretInput extends React.Component {
  state = {
    secret: "",
  }

  render () {
    const { navigation, selectedFestival, setAreas, setEvents, areas, events } = this.props;

    return(
      <View style={{width:'100%', alignItems:'center'}}>
        <TextInput
          value={this.state.secret}
          onChangeText={(secret) => {
            this.setState({secret})
          }}
          style={{backgroundColor:'white', color:'white', height: 50, borderColor: 'white', paddingLeft:20, borderWidth: 1, width:'80%', borderRadius:3, color:'black' }}
          placeholder="Enter secret..."
        />
        <Button
          buttonStyle={{backgroundColor: 'white', width:'80%', height: 45, borderRadius:3, marginTop:10}}
          textStyle={{color: '#7AC7EA'}}
          title="UNLOCK"
          onPress={() => {
            this.state.secret.toLowerCase() === selectedFestival.secret.toLowerCase() ?
            this.props.navigation.navigate('FestivalPage', {selectedFestival: selectedFestival, areas: areas, events: events})
            : Alert.alert( 'Incorrect secret',null,[{text: 'OK', onPress: () => console.log('OK Pressed')}])
            this.setState({secret: ""})
          }
        }/>
      </View>
    )
  }
}

Alert.alert( 'Incorrect secret',null,[{text: 'OK', onPress: () => console.log('OK Pressed')}])
