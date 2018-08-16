import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Spinner,
} from "native-base";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";

class LoadingComponent extends Component {

  render() {
    return <View>
      <Spinner size="large" color="red"/>
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

export default connect(mapStateToProps)(LoadingComponent);