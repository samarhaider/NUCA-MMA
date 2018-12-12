import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  List,
  ListView,
  FlatList,
  ListItem,
  Text,
  Button,
  Icon,
  Col,
  RefreshControl,
  H1,
} from "native-base";
import { SimpleLineIcons } from "@expo/vector-icons";
import Modal from 'react-native-modalbox';

import { getMatches, getMatchDetail, logoutUser } from "../Actions";
import * as CONSTANTS from "../Constants";
import styles from "../styles";

import LoadingComponent from "../Components/LoadingComponent";
import NoRecordFoundComponent from "../Components/NoRecordFoundComponent";
import MatchCardComponent from '../Components/MatchCardComponent'

class HomeContainer extends Component {

  state = {
    modal: false,
  };

  componentDidMount() {
    this.setState({showNextScreen: true});
    this.refreshList();
  }
  
  onLogoutButtonPress = () => {
    // alert('Do you want to logout?')
    this.setState({modal: true});
  }

  onPressYes = () => {
        this.props.dispatch(logoutUser());
  }

  refreshList = (page = 1) => {    
    this.props.dispatch(getMatches({ page }));
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

  closeModal = () => {
    this.setState({modal: false});
  }

  renderModalSuccess () {
    return (<Modal style={styles.modal} isOpen={this.state.modal} onClosed={() => this.closeModal()}>
      <SimpleLineIcons name="check" size={80} color="#848484" />
      {/* <H1 style={styles.successText}>Logout!</H1> */}
      <Text style={styles.modalText}>Are you sure to logout?</Text>
      <Col style={styles.modelButtonEnd} >
        <Button onPress={ this.onPressYes }><Text>Yes</Text></Button>
      </Col>
  </Modal>);
  }

  renderHeader() {
    return <Header>
              {/* <Button primary transparent onPress={() => this.props.navigation.navigate("DrawerToggle")}> */}
              <Button transparent>
                <Text></Text>
              </Button>
              <Body>
                <Title onPress={ () => this.refreshList(1) }>Home</Title>
              </Body>
              <Button transparent onPress={this.onLogoutButtonPress} >
                <Icon name="ios-power" style={{marginRight: -5}} />
              </Button>
            </Header>
  }

  _renderFooter = () => {
    const { loading, current_page } = this.props;
    if (loading) {
      return <LoadingComponent />;
    }
  }

  renderListItem = (match) => {
    return <ListItem transparent onPress={() => this.onMatchClick(match)}>
              <MatchCardComponent data={{...match}} />
          </ListItem>;
  }

  renderList() {
    const { loading, data, current_page } = this.props;
    if(loading && current_page == 0) {
      return <LoadingComponent />;
    }
    if(data.length == 0) {
      return  <NoRecordFoundComponent />
    }
    const next_page = current_page + 1;
    return <List dataArray={data}
                onEndReached={() =>  this.refreshList(next_page)}
                onEndReachedThreshold={10}
                initialListSize={10}
                renderFooter={this._renderFooter} 
                renderRow={(match) => this.renderListItem(match)}>
      </List>;
  }

  render() {
    return (
      <Container>
      {this.renderHeader()}
        <Content 
            style={{flex: 1}}
            contentContainerStyle={{flex: 1}} // important!
                  // scrollEnabled={true} 
                  // refreshControl={ <RefreshControl
                  //   refreshing={this.state.refreshing}
                  //   onRefresh={this.refreshList}  /> }
          >
          {this.renderList()}
        </Content>
        {this.renderModalSuccess()}
      </Container>
    );
  }
}

const mapStateToProps = ({ matchList }) => {
  return matchList;
};

export default connect(mapStateToProps)(HomeContainer);
