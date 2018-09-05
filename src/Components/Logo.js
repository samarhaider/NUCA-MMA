import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image} from 'react-native';
import { Text, View } from "native-base";

import logoImg from '../../assets/logo.png';

export default class Logo extends Component {

  renderMessage() {
    const message = this.props;
    if (message) {
      return <Text style={styles.text}>{message.message}</Text>
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={logoImg} style={styles.image} />
        {this.renderMessage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    textAlign: "center",
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: -50,
    marginLeft: 20,
    marginRight: 20,
  },
});
