import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image} from 'react-native';
import { H3, View } from "native-base";

import logoImg from '../../assets/icon.png';

export default class Logo extends Component {

  renderMessage() {
    const message = this.props;
    if (message) {
      return <H3 style={styles.text}>{message.message}</H3>
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
    width: 250,
    height: 250,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: -60,
  },
});
