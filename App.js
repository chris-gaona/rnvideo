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

  render() {
    const {width} = Dimensions.get("window");
    const height = width * 0.5625;

    return (
      <View style={styles.container}>
        {/*<Text style={styles.welcome}>*/}
          {/*Welcome to React Native!*/}
        {/*</Text>*/}
        {/*<Text style={styles.instructions}>*/}
          {/*To get started, edit App.js*/}
        {/*</Text>*/}
        {/*<Text style={styles.instructions}>*/}
          {/*{instructions}*/}
        {/*</Text>*/}
        <Video
          source={{uri: "https://www.w3schools.com/html/mov_bbb.mp4"}}
          resizeMode="contain"
          muted={false}
          style={{width, height}}/>
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
  }
});
