import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
} from "native-base";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";

class NoRecordFoundComponent extends Component {

  render() {
    return <View style={{alignContent: 'center', alignItems: 'center', paddingTop: 20}}>
    <Text style={{color: 'red', fontSize: 25}}>No result found</Text>
  </View>;
  }
}

// const mapStateToProps = state => {
//   return state.auth;
// };
// OR better is below, equal to above
const mapStateToProps = ({ auth }) => {
  return auth;
};

export default connect(mapStateToProps)(NoRecordFoundComponent);