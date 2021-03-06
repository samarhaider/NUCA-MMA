import React, { Component } from "react";
import { connect } from "react-redux";
import { BackHandler } from 'react-native';
import { SimpleLineIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
import { emailChanged, sendPasswordResetCode, modalSuccessPasswordResetCode, authErrorEmpty } from "../Actions";
import styles from "../styles";
import validateRules, {
  sendCodeValidation
} from "../Components/ValidationRules";
import Wallpaper from "../Components/Wallpaper";
import Logo from "../Components/Logo";

const message = "Sed ut perspiciatis unde omnis iste natus error sit ptatem"; 

class SendCodeContainer extends Component {
  
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  componentDidMount() {
    // this.props.dispatch(modalSuccessPasswordResetCode(false))
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

  errorCloseModal = () => {
    this.props.dispatch(authErrorEmpty());
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

  renderModalError () {
    if (!this.props.error) {
      return;
    }
    return (<Modal style={styles.modalError} isOpen={true} backdropPressToClose={false} onClosed={() => this.closeModal()}>
        <H1 style={styles.modalErrorHeader}>Alert</H1>
        <Text style={styles.modalText}>{this.props.error}</Text>
        <Col style={styles.modelButtonEnd} >
          <Button style={styles.modalErrorButton} onPress={() => this.errorCloseModal()}>
            <Text style={styles.modalTextError}>OK</Text>
          </Button>
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
        <KeyboardAwareScrollView
            extraScrollHeight={100}
            enableOnAndroid={true} 
            keyboardShouldPersistTaps='handled'
            >
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
            </Content>
          </KeyboardAwareScrollView>
        </Wallpaper>
        {this.renderModalSuccess()}
        {this.renderModalError()}
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return auth;
};

export default connect(mapStateToProps)(SendCodeContainer);
