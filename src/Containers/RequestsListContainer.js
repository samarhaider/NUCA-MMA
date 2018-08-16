import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import {
  Container,
  Header,
  Left,
  Title,
  Body,
  Content,
  Segment,
  Button,
  Text,
  Item,
  Input,
  Icon,
  StyleProvider,
} from "native-base";
import RequestsListComponent from "../Components/RequestsListComponent";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";

class RequestsListContainer extends Component {

  render() {
    return <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <Header>
             <Button primary transparent>
              <Icon name="arrow-back" />
            </Button>
            <Body>
              <Title>View Requests </Title>
            </Body>
            <Button primary transparent>
              {/* <FontAwesome name="filter" color={commonColor.brandPrimary} size={25} /> */}
            </Button>
          </Header>
          <Content>
          {/* <Item style={{ paddingLeft: 10}}>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item> */}
            <RequestsListComponent navigation={this.props.navigation} />
          </Content>
        </Container>
      </StyleProvider>;
  }
}

// const mapStateToProps = state => {
//   return state.auth;
// };
// OR better is below, equal to above
const mapStateToProps = ({ auth }) => {
  return auth;
};

export default connect(mapStateToProps)(RequestsListContainer);
