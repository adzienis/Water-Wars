import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Header1 = (props) => {
    return (
      <View style={style.wrapper}>
        <Text> { props.children } </Text>
      </View>
    );
}


const style = StyleSheet.create({
  wrapper : {
    borderBottomWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    borderColor: '#C5C5C5',
    backgroundColor: '#EEE2DC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%'
  }
});

export default Header1;
