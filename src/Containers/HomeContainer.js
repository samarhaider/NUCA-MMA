import React, { Component } from "react";
import { connect } from "react-redux";
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

import { getMatches, getMatchDetail, logoutUser } from "../Actions";
import * as CONSTANTS from "../Constants";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import LoadingComponent from "../Components/LoadingComponent";
import NoRecordFoundComponent from "../Components/NoRecordFoundComponent";
import MatchCardComponent from '../Components/MatchCardComponent'

class HomeContainer extends Component {

  componentDidMount() {
    this.setState({showNextScreen: true});
    this.props.dispatch(getMatches({}));
  }
  
  onLogoutButtonPress = () => {
    // alert('Do you want to logout?')
    this.props.dispatch(logoutUser());
  }

  onMatchClick = (match) => {
    if (this.state.showNextScreen) {
      // enable after 3 second
      setTimeout(()=>{
        this.setState({
          showNextScreen: true,
      });
    }, 3000);
      this.setState({showNextScreen: false});
      this.props.dispatch({type: CONSTANTS.MATCH_DETAIL_SUCCESS, payload: match});
      this.props.navigation.navigate("resultAdd", {match})
    }
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
                <Icon name="ios-power" style={{marginRight: -5}} />
              </Button>
            </Header>
  }

  renderListItem = (match) => {
    return <ListItem transparent onPress={() => this.onMatchClick(match)}>
              <MatchCardComponent data={{...match}} />
          </ListItem>;
  }

  renderList() {
    const { loading, data } = this.props;
    if(loading) {
      return <LoadingComponent />
    }
    if(data.length == 0) {
      return  <NoRecordFoundComponent />
    }
    return <List dataArray={data}
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

const mapStateToProps = ({ matchList }) => {
  return matchList;
};

export default connect(mapStateToProps)(HomeContainer);
