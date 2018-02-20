/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import Video from 'react-native-video';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    error: false
  };

  handleError = (meta) => {
    const {error: {code}} = meta;
    let error = "An error occurred playing this video";

    switch (code) {
      case -11800:
        error = "Could not load video from URL";
        break;
    }

    this.setState({
      error
    })
  };

  render() {
    const {width} = Dimensions.get("window");
    const height = width * 0.5625;
    const {error} = this.state;

    return (
      <View style={styles.container}>
        <View style={error ? styles.error : null}>
          <Video
            source={{uri: "https://www.w3schools.com/htmld/mov_bbb.mp4"}}
            resizeMode="contain"
            muted={true}
            onError={this.handleError}
            style={{width, height}}/>
          <View style={styles.videoCover}>
            {error && <Text>{error}</Text>}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  videoCover: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,.9)'
  },
  error: {
    backgroundColor: "#000"
  }
});
