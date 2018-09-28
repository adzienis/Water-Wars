import React from 'react';
import { Image } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { createStackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

import HomeScreen from './src/containers/HomeScreen/HomeScreen.js';
import MainScreen from './src/containers/MainScreen/MainScreen.js';
import CameraScreen from './src/containers/CameraScreen/CameraScreen.js';
import AssReg from './src/containers/AssReg/AssReg.js';

import waterBackground from './src/assets/images/waterBackground-tiltshift.jpg';
import montserratFont from './src/assets/fonts/Montserrat-Regular.ttf';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
      return Asset.fromModule(image).downloadAsync();
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}


 class App extends React.Component {
  state = { isReady: false }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      waterBackground,
    ]);

    const fontAssets = cacheFonts([montserratFont]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }


  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
        <Test />
    );
  }
}

const Test = createStackNavigator({
  Home: { screen: HomeScreen },
  Next: { screen: MainScreen },
  Camera: { screen: CameraScreen },
  AssReg: { screen: AssReg } },
  {
    initialRouteName: 'Home',
    initialRouteParams: {
      image: waterBackground,
      font: montserratFont
    },
    headerMode: 'none',
  }
);

export default App;
