import React from 'react';
import { StyleSheet, Button, Image, View, Text, TextInput, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient, Font } from 'expo';
import * as firebase from 'firebase';

import FadeInView from '../../containers/FadeInView/FadeInView.js';

export default class HomeScreen extends React.Component {
  config = {
    apiKey: "private",
    authDomain: "water-wars-9fc58.firebaseapp.com",
    databaseURL: "https://water-wars-9fc58.firebaseio.com",
    projectId: "water-wars-9fc58",
    storageBucket: "water-wars-9fc58.appspot.com",
    messagingSenderId: "1076894477559"
  };

  font = null;
  static navigationOptions = { header: null }

  state = {
    fontLoaded: false,
    email: '',
    pass: ''
  }

  async submit () {
    firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.pass)
            .then(() => {
              this.props.navigation.navigate('Next', { firebase: firebase, email: this.state.email });
            })
            .catch((err) => console.log(err));
  }

  async componentWillMount() {
    await firebase.initializeApp(this.config);
      await Font.loadAsync({
        Montserrat: this.props.navigation.getParam('font', null),
      });
      this.setState({ fontLoaded: true });
  }
  render() {
    return (
      <FadeInView style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            width: 100 + '%' }}
        >
          <StatusBar hidden />
          <ImageBackground
            style={styles.image}
            source={this.props.navigation.getParam('image', null)}
          >
            <View style={{ flex: 1 }} />
            <View style={{ flex: 2, backgroundColor: 'white', alignItems: 'center' }} >
              <TextInput onChangeText={ (u) => this.setState({email: u}) } placeholder='email' style={ styles.textIn } />
              <TextInput onChangeText={ (u) => this.setState({pass: u}) } placeholder='password' style={ styles.textIn }/>
              <TouchableOpacity onPress={this.submit.bind(this)} style={{ width: '30%', height: '10%', backgroundColor: 'teal', borderColor: 'red', borderWidth: 2, borderRadius: 10 }} title='submit'>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text title='Submit' style={{ fontSize: 25 }}>  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </FadeInView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
      flexDirection: 'row',
      width: 300,
      height: 60,
      fontSize: 30,
      padding: 10,
      textAlign: 'center',
  },
  image: {
    flex: 1,
    width: 100 + '%',
    height: 100 + '%'
  },
  gradient: {
    margin: 10 + "%",
    padding: 2,
    borderRadius: 30
  },
  textIn: {
    borderColor: 'black', 
    borderWidth: 2, 
    width: '90%', 
    height: '10%', 
    fontSize: 20,
    margin: 10,
    borderRadius: 5,
    padding: 5
  },
  outerView: {

  } });
