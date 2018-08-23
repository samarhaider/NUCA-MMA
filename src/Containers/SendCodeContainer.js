import React, { Component } from "react";
import { connect } from "react-redux";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  H1,
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
  View,
  Icon,
  Title,
  Col,
} from "native-base";
import Modal from 'react-native-modalbox';
import { emailChanged, sendPasswordResetCode, modalSuccessPasswordResetCode } from "../Actions";
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
  
  componentDidMount() {
    this.props.dispatch(modalSuccessPasswordResetCode(false))
  }

  closeModal = () => {
    this.props.dispatch(modalSuccessPasswordResetCode(false))
    this.props.navigation.navigate("login");
  }

  onSubmitButtonPress = () => {
    // const errors = validateRules(this.props, sendCodeValidation);
    // if (!errors) {
      const { email } = this.props;
      this.props.dispatch(sendPasswordResetCode({ email }));
      // this.props.navigation.navigate("login");
    // }
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

  renderModalSuccess () {
    return (<Modal style={styles.modal} isOpen={this.props.modalSuccess} onClosed={() => this.closeModal()}>
    <Col>
      <SimpleLineIcons name="check" size={80} color="#848484" />
    </Col>
      <H1 style={styles.successText}>Successful!</H1>
    <Col>
      <Text style={styles.modalText}>We have sent a password reset link to your email address</Text>
    </Col>
  </Modal>);
  }

  render() {
    return (
      <Container>
        <Header style={styles.authHeader}>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="ios-arrow-back" style={{marginLeft: -5}} />
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
                  style={{color: "#FFF", paddingLeft: 40}} 
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
            <KeyboardSpacer />
          </Content>
        </Wallpaper>
        {this.renderModalSuccess()}
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return auth;
};

export default connect(mapStateToProps)(SendCodeContainer);
