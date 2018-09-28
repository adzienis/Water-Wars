import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { Video, FileSystem } from 'expo';

import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'

import Header1 from '../../components/Header1/Header1.js';



export default class AssReg extends React.Component {

  //FUCKING SOLUTION TAKES 7 LINES FUCK THIS TOOK SO FUCKING LONG
  async uploadImage(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const timeMS = Date.now();
    const firebase = this.props.navigation.getParam('firebase', null);
    const email = this.props.navigation.getParam('email', '');

    const ref = firebase
        .storage()
        .ref('/videos/' + email + '/')
        .child('video' + timeMS + '.mov');
    const snapshot = await ref.put(blob);
    console.log(snapshot);
    console.log(snapshot.ref);
    const url = await snapshot.ref.getDownloadURL();
    firebase
      .database()
      .ref('vidData/')
      .child(email.split('@')[0])
      .child(timeMS)
      .set({
        time: timeMS,
        url: url
    });

    this.props.navigation.navigate('Next', this.props.navigation.state.params );
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Header1> Assassination Registration </Header1>
        <FormLabel> Name </FormLabel>
        <FormInput style={{ width: '90%', height: '10%' }} placeholder='Target Name'/>
        <Button onPress={ async () => { this.props.navigation.getParam('firebase', null).database().ref('videos/0').set({ url: this.props.navigation.getParam('video', '')}); await (this.uploadImage.bind(this))(this.props.navigation.getParam('video', ''));} } title = 'Submit' />
        <Video shouldPlay isLooping style={{ flex:10, width: 400, height: 400 }} source={{ uri: this.props.navigation.getParam('video', '') }} />
      </View>
    );
  }
}
