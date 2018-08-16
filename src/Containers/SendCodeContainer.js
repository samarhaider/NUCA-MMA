import React, { Component } from "react";
import { connect } from "react-redux";
import Toast from "react-native-root-toast";
import { ImageBackground } from 'react-native';
import {
  Root,
  Container,
  Content,
  Header,
  Body,
  Button,
  Spinner,
  Item,
  Input,
  Text,
  Form,
  Label,
  H1,
  Footer,
  FooterTab,
  View,
  Icon,
  Title,
  StyleProvider
} from "native-base";
import { emailChanged, sendPasswordResetCode } from "../Actions";
import styles from "../styles";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import validateRules, {
  sendCodeValidation
} from "../Components/ValidationRules";
import Wallpaper from "../Components/Wallpaper";
import Logo from "../Components/Logo";

const message = "Sed ut perspiciatis unde omnis iste natus error sit ptatem"; 

class SendCodeContainer extends Component {
  onSubmitButtonPress = () => {
    const errors = validateRules(this.props, sendCodeValidation);
    if (!errors) {
      const { email } = this.props;
      // this.props.dispatch(sendPasswordResetCode({ email }));
      this.props.navigation.navigate("login");
    }
  }
  onemailChanged = (text) => {
    this.props.dispatch(emailChanged(text));
  }
  renderSubmitButton() {
    if (this.props.loading) {
      return <Button full>
          <Spinner size="large" color="#fff" />
        </Button>;
    }

    return (
      <Button rounded full onPress={this.onSubmitButtonPress} style={styles.authSubmitButton}>
        <Text uppercase={true}>
          Reset Password
        </Text>
      </Button>
    );
  }

  render() {
    return (
      <Container>
        <Header style={styles.authHeader}>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back"/>
          </Button>
          <Body>
              <Title uppercase={true} >FORGOT PASSWORD</Title>
          </Body>
          <Button transparent>
            <Text></Text>
          </Button>
        </Header>
        <Wallpaper >
          <Content padder >
            <Logo message={message} />
            <Form style={{ margin: 20 }}>
              <Item >
                {/* <Icon active name='md-call' />                */}
                <Input
                  style={{color: "#FFF"}} 
                  placeholder="Enter your email address"
                  value={this.props.email}
                  onChangeText={this.onemailChanged}
                  keyboardType="email-address"
                  disabled={this.props.loading}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  returnKeyType={'done'}
                />
              </Item>
              <View>
                {this.renderSubmitButton()}
              </View>
            </Form>
          </Content>
        </Wallpaper>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return auth;
};

export default connect(mapStateToProps)(SendCodeContainer);
