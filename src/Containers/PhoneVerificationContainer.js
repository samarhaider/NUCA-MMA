import React, { Component } from "react";
import { connect } from "react-redux";
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
import { phoneChanged, sendPasswordResetCode, verificationCodeChanged, sendVerificationCode, resendVerificationCode } from "../Actions";
import styles from "../styles";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import validateRules, {
  sendCodeValidation
} from "../Components/ValidationRules";

class PhoneVerificationContainer extends Component {
  onPhoneChanged(text) {
    this.props.dispatch(phoneChanged(text));
  }
  verificationCodeChanged(text) {
    this.props.dispatch(verificationCodeChanged(text));
  }
  onResendVerificationCodePress(){
    const { phone } = this.props;
    this.props.dispatch(resendVerificationCode({phone}));    
  }
  onSubmitButtonPress() {
    const { phone, verification_code } = this.props;
    this.props.dispatch(sendVerificationCode({ phone, verification_code }));
  }
  renderSubmitButton() {
    if (this.props.loading) {
      return <Button info full>
          <Spinner size="large" color="white" />
        </Button>;
    }

    return (
      <Button info full onPress={this.onSubmitButtonPress.bind(this)}>
        <Text uppercase={false} style={styles.authFooterText}>
          Continue
        </Text>
      </Button>
    );
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Root>
          <Container>
            <Header>
              <Body style={styles.headerBody}>
                <Title>Phone Verification</Title>
              </Body>
            </Header>
            <Content padder>
              <Form style={{ marginTop: 20 }}>
              <View style={{margin: 40}}>
                  <Text style={{ fontSize: 20, textAlign: 'center' }}>
                    A verification code is sent on your provided mobile number, please enter the code to complete registration
                  </Text>
              </View>
              <View>
                  <Text style={{ fontSize: 20, textAlign: 'center', color: 'skyblue' }}>
                    {this.props.phone || "+1 485 215 8956"}
                  </Text>
              </View>
              <View style={{alignItems: 'center' }}>
                {/* <TextInput
                  onChangeText={(value) => this.verificationCodeChanged(value)}
                  ref={'textInput'}
                  name={'code'}
                  type={'TextInput'}
                  underlineColorAndroid={'transparent'}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  placeholder={'_ _ _ _'}
                  keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                  style={styles.textInput}
                  returnKeyType='go'
                  placeholderTextColor={"#7F7F7F"}
                  selectionColor={"#000"}
                  maxLength={4}/> */}
                  <Input
                    placeholder={'_ _ _ _'}
                    onChangeText={this.verificationCodeChanged.bind(this)}
                    value={this.props.verification_code}
                    keyboardType="numeric"
                    maxLength={4}
                    disabled={this.props.loading}
                  />
                </View>
              </Form>
              <View style={{ marginTop: 50 }}>
                  <Text style={{ fontSize: 20, textAlign: 'center', color: 'red' }} disabled={this.props.loading} onPress={this.onResendVerificationCodePress.bind(this)} >
                    I didn't get a code
                  </Text>
              </View>
              <View style={{ marginTop: 100, margin: 40 }}>
                  <Text style={{ fontSize: 12, textAlign: 'center' }}>
                    Tap to Continue to accept the <Text style={{fontSize: 12, textDecorationLine: 'underline'}} >Privacy Policy</Text> and <Text style={{fontSize: 12, textDecorationLine: 'underline'}} >Term of services</Text> of Brownie
                  </Text>
              </View>
            </Content>
            <Footer>
              <FooterTab>{this.renderSubmitButton()}</FooterTab>
            </Footer>
          </Container>
        </Root>
      </StyleProvider>
    );
  }
}

// const mapStateToProps = state => {
//   return state.auth;
// };
// OR better is below, equal to above
const mapStateToProps = ({ auth }) => {
  return auth;
};

export default connect(mapStateToProps)(PhoneVerificationContainer);
