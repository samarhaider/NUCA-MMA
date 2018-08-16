import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Feather } from "@expo/vector-icons";
import {
  Container,
  Spinner,
  Content,
  Row,
  Col,
  Button,
  Grid,
  Item,
  Input,
  Text,
  Form,
  Label,
  InputGroup,
  Badge,
  Icon,
  Header,
  Title,
  Body,
  Footer,
  FooterTab,
  StyleProvider
} from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import {
  emailChanged,
  passwordChanged,
  loginUser
} from '../Actions';
import styles from "../styles";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";

class ProfileUpdateContainer extends Component {
  renderUpdateButton() {
    // if (this.props.loading) {
    //   return <Spinner size="large" />;
    // }

    return (
      <Button info full >
        <Text uppercase={false} style={styles.authFooterText}>
          Update Info
        </Text>
      </Button>
    );
  }

  onEmailChangedChanged(){
    
  }

  render() {
    let profile = this.props.updateProfile
    return <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <Header>
            <Button primary transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
            <Body>
              <Title>Profile </Title>
            </Body>
            <Button primary transparent>
              <Text />
              {/* <FontAwesome name="edit" color={commonColor.brandPrimary} size={25} /> */}
            </Button>
          </Header>
          <Content>
            <Form style={{ marginTop: 20 }}>
              <Item>
                <Input placeholder="First Name" value={profile.firstname} />
              </Item>
              <Item>
                <Input placeholder="Last Name" value={profile.lastname} />
              </Item>
              <Item>
                <Feather name="at-sign" size={25} />
                <Input placeholder="Email" onChangeText={this.onEmailChangedChanged.bind(this)} keyboardType="email-address" value={profile.email} />
              </Item>
              <Item>
                <FontAwesome name="phone" size={25} />
                <Input placeholder="Phone" value={profile.phone} disabled={true} keyboardType="phone-pad" />
              </Item>
              <Item>
                <FontAwesome name="lock" size={25} />
                <Input placeholder="Password" />
              </Item>
              <Item>
                <FontAwesome name="lock" size={25} />
                <Input placeholder="Confirm Password" secureTextEntry disabled={profile.loading} />
              </Item>
              <Text style={{}}>{this.props.error}</Text>
            </Form>
          </Content>
          <Footer>  
            <FooterTab>{this.renderUpdateButton()}</FooterTab>
          </Footer>
        </Container>
      </StyleProvider>;
  }
}

// const mapStateToProps = state => {
//   return state.profile;
// };
// OR better is below, equal to above
const mapStateToProps = ({ auth }) => {
  return auth;
};

export default connect(mapStateToProps)(ProfileUpdateContainer);
