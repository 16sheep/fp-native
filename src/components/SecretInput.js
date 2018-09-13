import React from 'react'
import { TextInput, View, Alert} from 'react-native';
import { Text, Button } from 'react-native-elements';


export default class SecretInput extends React.Component {
  state = {
    secret: "",
  }

  render () {
    const { navigation, selectedFestival, setAreas, setEvents, areas, events, selectFestival } = this.props;

    handleUnlock = () => {
      this.state.secret.toLowerCase() === selectedFestival.secret.toLowerCase() ?
      this.props.navigation.navigate('FestivalPage', {selectedFestival: selectedFestival, areas: areas, events: events})
      : Alert.alert( 'Incorrect secret',null,[{text: 'OK', onPress: () => console.log('OK Pressed')}])
      this.setState({secret: ""})
    }

    return(
      <View style={{width:'100%', flex:1, alignItems:'center', position:'absolute', height:500, backgroundColor:'rgba(255, 255, 255, 0.9)', top: 40}}>
        <View style={{ top:150, width:'100%', flex:1, alignItems:'center', position:'absolute'}}>
        <Text h4 style={{color:'#666', marginBottom: 10}}>{selectedFestival.name}</Text>
        <TextInput
          value={this.state.secret}
          onChangeText={(secret) => {
            this.setState({secret})
          }}
          style={{fontSize:20, color:'#666',backgroundColor:'white', color:'white', height: 50, borderColor: 'white', paddingLeft:20, borderWidth: 1, width:'80%',borderWidth:1, borderBottomColor:'#fd5c63', borderRadius:3, color:'black' }}
          placeholder="Enter secret..."
        />
        <Button
          buttonStyle={{backgroundColor:'#FFD700',marginLeft:7, width:'80%', height: 45, borderWidth:1, borderColor:"#FFD700", borderRadius:3, marginTop:10}}
          textStyle={{color: 'white', fontWeight:'bold'}}
          title="UNLOCK"
          onPress={ handleUnlock }/>
          <Button
          icon={{
                  name: 'close',
                  size: 30,
                  color: '#333'
                }}
            onPress={() => selectFestival("")}
            buttonStyle={{backgroundColor: 'transparent', height: 50}}/>
            />
      </View>
      </View>
    )
  }
}
