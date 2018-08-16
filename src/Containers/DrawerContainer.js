import React, { Component } from 'react';
import { connect } from "react-redux";
import { Text, View, Image } from "react-native";
import { Container, Content ,Separator} from "native-base";
import { NavigationActions } from "react-navigation";
import { logoutUser } from "../Actions";
import styles from '../styles';

class DrawerContainer extends Component {
  onLogoutButtonPress() {
    this.props.navigation.dispatch(logoutUser({}));
  }

  render() {
    const { auth, navigation } = this.props;
    return <Container style={styles.drawerContainer}>
        <Content>
        {/* <Separator>
            <Text style={styles.drawerItem}>
              {auth && `${auth.first_name} ${auth.last_name}`}
            </Text>
          </Separator> */}
          <Separator >
            <Text onPress={() => navigation.navigate("home")} style={styles.drawerItem}>
              Home
            </Text>
          </Separator>
          <Separator bordered >
            <Text onPress={this.onLogoutButtonPress.bind(this)} style={styles.drawerItem}>
              Logout
            </Text>
          </Separator>
        </Content>
      </Container>;
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(DrawerContainer);


