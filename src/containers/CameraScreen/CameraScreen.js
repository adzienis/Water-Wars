import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    video: ''
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignItems: 'flex-end'
              }}>
              <View style={{ flex: 1, marginBottom: 40, width: 60, height: 60, alignItems: 'center'}}>
                <TouchableOpacity
                  onPressOut={ () => this.camera.stopRecording() }
                  onPressIn={async () => {
                  /*  this.setState({
                      type: this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                    });*/
                    const temp = (await this.camera.recordAsync()).uri;
                    this.setState({ video: temp });
                    this.props.navigation.navigate('AssReg', {...{ video: this.state.video }, ...this.props.navigation.state.params })
                  }}>
                  <Image style={{ width: 60, height: 60 }} source={require('../../assets/images/hitmark.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
