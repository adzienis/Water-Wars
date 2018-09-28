import React from 'react';
import { View, Text, SectionList, Image, TouchableOpacity } from 'react-native';

import Header1 from '../../components/Header1/Header1.js';

class LoginScreen extends React.Component {
  state = {
    sections: null
  }

  setSections(sections) {
    this.state.setState({ sections: 'a' });
  }
  
  getData () {
    const that = this;
    //const binded = this.setSections.bind(this);
    this.props.navigation.state.params.firebase
                    .database()
                    .ref()
                    .child('vidData')
                    .on('value', (sp) => {
                       that.setState({ sections: sp.val() });
                    });

  }
  
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  mapSections() {
    const that = this;
    //console.log(that.state.sections);
    const t =  Object.keys(that.state.sections).map.bind((valTop, indexTop) => {
      return Object.keys(that.state.sections[valTop]).map((val, index) => {
        return { title: valTop, data: [{ school: 'test', url: that.state.sections[valTop][val].url }]}
      })
    })
    console.log(t);

    return t;
  }

  componentWillMount() {
    (this.getData.bind(this))();
  }


  render() {
    return this.state.sections ? (
      <View style={{ backgroundColor: '#FFFCF7', flex: 1 }}>
        <Header1>
          My Feed
        </Header1>
        <View style={{ flex: 10 }}>
          <SectionList
            stickySectionHeadersEnabled={false}
            renderItem={({item, index, section }) => <View style={{ marginTop: 10, alignItems: 'center'}}> <Image style={{ width: 300, height: 400 }} source={{ uri: item.url }}/> <Text style= { {alignItems: 'center', margin: 10 }} key={index}> {item.school} </Text></View>}
            renderSectionHeader={({ section: { title } }) => <View style={{ margin: 10, alignItems: 'center' }}><Text> {title}</Text></View>}
            SectionSeparatorComponent={this.renderSeparator}
            sections={
              (this.mapSections.bind(this))()
            }
            keyExtractor={(item, index) => item + index}
          />
      </View>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Camera', this.props.navigation.state.params ) }
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderWidth: 0.5, backgroundColor: '#BAB2B5', shadowColor: 'black', shadowOpacity: 0.3, shadowOffset: { width: 0, height: -1 }}}>
        <Text > Assassinate </Text>
      </TouchableOpacity>
      console.log(that.setSections)
      </View>
    ) : null ;
  }
  }

export default LoginScreen;
