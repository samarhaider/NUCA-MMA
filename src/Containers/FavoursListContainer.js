import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import {
  Root,
  Header,
  Title,
  Body,
  Content,
  Segment,
  Button,
  Text,
  List,
  ListItem,
  StyleProvider
} from "native-base";
import ListViewComponent from "../Components/ListViewComponent";
import FovorsAddedByMeComponent from "../Components/FovorsAddedByMeComponent";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import {
  getFavours,
  getFavours2,
  getFavours3,
} from "../Actions";
import * as CONSTANTS from '../Constants';

const tabValue = {
  PENDING: 1,
  ACTIVE: 2,
  COMPLETED: 3,
}

class FavoursListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: tabValue.PENDING };
  }

  componentDidMount(){
    this.segmentTabPressed(tabValue.PENDING);
  }
  
  segmentTabPressed(tab) {
    this.setState({ activeTab: tab });
    const {id} = this.props.auth;
    switch(tab){
      case tabValue.PENDING:
        this.props.dispatch(getFavours({user_id:id, status: CONSTANTS.FAVOUR_STATUS_PENDING}));
        break;
      case tabValue.ACTIVE:
        this.props.dispatch(getFavours({user_id:id, status: CONSTANTS.FAVOUR_STATUS_INPROGRESS}));
        this.props.dispatch(getFavours2({user_id:id, status: CONSTANTS.FAVOUR_STATUS_REVIEW_PENDING}));
        break;
      case tabValue.COMPLETED:
        this.props.dispatch(getFavours({user_id:id, status: CONSTANTS.FAVOUR_STATUS_COMPLETED}));
        this.props.dispatch(getFavours2({user_id:id, status: CONSTANTS.FAVOUR_STATUS_DISPUTED}));
        this.props.dispatch(getFavours3({user_id:id, status: CONSTANTS.FAVOUR_STATUS_CANCELLED_BOFORE_START}));
        break;
    }
  }

  renderHeader() {
    return <Header>
            <Button primary transparent onPress={() => this.props.navigation.navigate("DrawerToggle")}>
              <SimpleLineIcons name="list" size={25} color={commonColor.brandPrimary} />
            </Button>
            <Body>
              <Title>Favours List </Title>
            </Body>
            <Button primary transparent>
              <Text />
            </Button>
          </Header>;
  }

  renderSegment(){
    return <Segment>
            <Button first  onPress={() => this.segmentTabPressed.bind(this)(tabValue.PENDING)} active={this.state.activeTab == tabValue.PENDING ? true : false}>
              <Text>Pending</Text>
            </Button>
            <Button  onPress={() => this.segmentTabPressed.bind(this)(tabValue.ACTIVE)} active={this.state.activeTab == tabValue.ACTIVE ? true : false}>
              <Text>Active</Text>
            </Button>
            <Button last  onPress={() => this.segmentTabPressed.bind(this)(tabValue.COMPLETED)} active={this.state.activeTab == tabValue.COMPLETED ? true : false}>
              <Text>Completed</Text>
            </Button>
          </Segment>;
  }

  renderPendingList() {
    if(this.state.activeTab != tabValue.PENDING) {
      return
    }
    return <ListViewComponent navigation={this.props.navigation} favours={this.props.favourList} status={1} />;
  }

  renderActiveList() {
    if(this.state.activeTab != tabValue.ACTIVE) {
      return
    }
    return <List>
        <ListItem first>
          <Text>In Progress</Text>
        </ListItem>
        <ListViewComponent navigation={this.props.navigation} favours={this.props.favourList} status={1} />
        <ListItem>
          <Text>Review Pending</Text>
        </ListItem>
        <ListViewComponent navigation={this.props.navigation} favours={this.props.favourList2} status={1} />
        </List>
  }

  renderCompletedList() {
    if(this.state.activeTab != tabValue.COMPLETED) {
      return
    }
    return <List>
      <ListItem first>
        <Text>Completed</Text>
      </ListItem>
      <ListViewComponent navigation={this.props.navigation} favours={this.props.favourList} status={1} />
      <ListItem>
        <Text>Disputed</Text>
      </ListItem>
      <ListViewComponent navigation={this.props.navigation} favours={this.props.favourList2} status={1} />
      <ListItem>
        <Text>Cancelled</Text>
      </ListItem>
      <ListViewComponent navigation={this.props.navigation} favours={this.props.favourList3} status={1} />
    </List>
  }

  render() {
    return <StyleProvider style={getTheme(commonColor)}>
        <Root>
            {this.renderHeader()}
            {this.renderSegment()}

          <Content style={{backgroundColor:'white'}}>
            {this.renderPendingList()}
            {this.renderActiveList()}
            {this.renderCompletedList()}
          </Content>
        </Root>
      </StyleProvider>;
  }
}

const mapStateToProps = ({ favourList, favourList2, favourList3, auth }) => {
  return { favourList, favourList2, favourList3, auth };
};

export default connect(mapStateToProps)(FavoursListContainer);
