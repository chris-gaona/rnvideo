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
  Dimensions,
  Animated
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
    error: false,
    buffering: true,
    animated: new Animated.Value(0)
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

  handleLoadStart = () => {
    this.triggerBufferAnimation();
  };

  handleBuffer = meta => {
    meta.isBuffering && this.triggerBufferAnimation();

    if (this.loopingAnimation && !meta.isBuffering) {
      this.loopingAnimation.stopAnimation();
    }

    this.setState({
      buffering: meta.isBuffering
    })
  };

  triggerBufferAnimation = () => {
    this.loopingAnimation = Animated.loop(
      Animated.timing(this.state.animated, {
        toValue: 1,
        duration: 350,
      })
    ).start();
  };

  render() {
    const {width} = Dimensions.get("window");
    const height = width * 0.5625;
    const {error, buffering} = this.state;

    const interpolatedAnimation = this.state.animated.interpolate(({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    }));

    const rotateStyle = {
      transform: [
        { rotate: interpolatedAnimation }
      ]
    };

    return (
      <View style={styles.container}>
        <View style={[error ? styles.error : null, buffering ? styles.buffering : null]}>
          <Video
            source={{uri: "https://www.w3schools.com/html/mov_bbb.mp4"}}
            resizeMode="contain"
            muted={true}
            onError={this.handleError}
            onLoadStart={this.handleLoadStart}
            onLoad={this.handleBuffer}
            style={{width, height}}/>
          <View style={styles.videoCover}>
            {buffering && <Animated.View style={rotateStyle}><Text style={styles.bufferingText}>Loading...</Text></Animated.View>}
            {/*{buffering && <Animated.View style={rotateStyle}><Icon name="circle-o-notch" size={30} color="#fff"/></Animated.View>}*/}
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
    backgroundColor: 'transparent'
  },
  error: {
    backgroundColor: "#000"
  },
  buffering: {
    backgroundColor: "#000"
  },
  bufferingText: {
    color: "#fff"
  }
});
