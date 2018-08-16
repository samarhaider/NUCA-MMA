import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  Body,
  Thumbnail,
  Badge,
  Button,
  Text,
  List,
  ListItem,
  Icon,
  Spinner,
  View,
  StyleProvider
} from "native-base";
import styles from "../styles";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import {
  getFriends,
} from "../Actions";
import * as CONSTANTS from '../Constants';

class FriendsListContainer extends Component {
  
  componentDidMount(){
    this.props.dispatch(getFriends({}));
  }
  
  onItemButtonPress() {
    this.props.navigation.navigate("userProfile");
  }

  renderHeader() {
    return (
      <Header>
        <Button primary transparent onPress={() => this.props.navigation.navigate("DrawerToggle")}>
          <SimpleLineIcons name="list" size={25} color={commonColor.brandPrimary} />
        </Button>
        <Body>
          <Title>Friends </Title>
        </Body>
        <Button primary transparent>
          <Text />
        </Button>
      </Header>
    );
  }

  renderAvatarOrInitial(friend) {
    const { avatar } = friend.profile;
    if(avatar) {
      return <Thumbnail size={80} source={{ uri: `${CONSTANTS.API_BASE_URL}avatar` }} />
    }
    return <Badge info>
            <Text uppercase>{friend.firstname.charAt(0)}{friend.lastname.charAt(0)}</Text>
          </Badge>
  }

  renderItem(friend) {
    return (
      <ListItem onPress={this.onItemButtonPress.bind(this)}>
        {this.renderAvatarOrInitial(friend)}
        <Body>
          <Text>{friend.fullname}</Text>
        </Body>
        <Icon name="ios-remove-circle" style={{ color: "red" }} />
      </ListItem>
    );
  }

  renderList() {
    const {friendList} = this.props;
    if(friendList.loading){
      return  <View>
            <Spinner size="large"/>
        </View>
    }

    return <List dataArray={friendList.data}
          renderRow={(friend) => this.renderItem(friend)} />;
  }

  render() {
    const {friendList} = this.props;
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          {this.renderHeader()}
          <View padder>
            <Text>{friendList.data.length} Friends</Text>
          </View>
          {this.renderList()}
        </Container>
      </StyleProvider>
    );
  }
}

// const mapStateToProps = state => {
//   return state.auth;
// };
// OR better is below, equal to above
const mapStateToProps = ({ friendList, auth }) => {
  return { friendList, auth };
};

export default connect(mapStateToProps)(FriendsListContainer);
