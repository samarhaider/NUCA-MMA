import React, { Component } from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  List,
  ListItem,
  Text,
  Button,
  Icon,
} from "native-base";

import styles from "../styles";
// import {  } from "../Actions";
import * as CONSTANTS from "../Constants";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import LoadingComponent from "../Components/LoadingComponent";
import NoRecordFoundComponent from "../Components/NoRecordFoundComponent";
import MatchCardComponent from '../Components/MatchCardComponent'
import RoundComponent from '../Components/RoundComponent'

class HomeContainer extends Component {

  componentDidMount() {
    // this.props.dispatch(inProgressLoad({}));
  }
  
  onLogoutButtonPress = () => {
    alert('Do you want to logout?')
    this.props.navigation.navigate("login");
    // this.props.dispatch(logout());
  }

  onMatchClick = (match) => {
    this.props.navigation.navigate("resultAdd", match)
  }
  
  renderHeader() {
    return <Header>
              {/* <Button primary transparent onPress={() => this.props.navigation.navigate("DrawerToggle")}> */}
              <Button transparent>
                <Text></Text>
              </Button>
              <Body>
                <Title>Home</Title>
              </Body>
              <Button transparent onPress={this.onLogoutButtonPress} >
                <Icon name="ios-power" />
              </Button>
            </Header>
  }

  renderListItem = (match) => {
    return <ListItem transparent onPress={() => this.onMatchClick(match)}>
              <MatchCardComponent data={match} />
          </ListItem>;
  }

  renderList() {
    const { matchList } = this.props;
    if(matchList.loading) {
      return <LoadingComponent />
    }
    // if(matchList.data.length == 0) {
    //   return  <NoRecordFoundComponent />
    // }
    return <List dataArray={matchList.data}
                 renderRow={(match) => this.renderListItem(match)}>
      </List>;
  }

  render() {
    return (
      <Container>
      {this.renderHeader()}
        <Content scrollEnabled={true} >
          {this.renderList()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ matchList, auth }) => {
  return { matchList, auth };
};

export default connect(mapStateToProps)(HomeContainer);
