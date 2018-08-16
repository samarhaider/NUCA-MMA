import React, { Component } from "react";
import { connect } from "react-redux";
import Toast from "react-native-root-toast";
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
import { phoneChanged, sendPasswordResetCode, verificationCodeChanged, sendVerificationCode } from "../Actions";
import styles from "../styles";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import validateRules, {
  sendCodeValidation,
} from "../Components/ValidationRules";

class VerifyPhoneContainer extends Component {
  onSubmitButtonPress() {
    // const errors = validateRules(this.props, sendCodeValidation);
    // if (!errors) {
      const { phone, verification_code } = this.props;
      this.props.dispatch(sendVerificationCode({ phone, verification_code }));
    // }
  }
  onPhoneChanged(text) {
    this.props.dispatch(phoneChanged(text));
  }
  verificationCodeChanged(text) {
    this.props.dispatch(verificationCodeChanged(text));
  }
  renderSubmitButton() {
    if (this.props.loading) {
      return (
        <Button info full>
          <Spinner size="large" color="white" />
        </Button>
      );
    }

    return (
      <Button info full onPress={this.onSubmitButtonPress.bind(this)}>
        <Text uppercase={false} style={styles.authFooterText}>
          Verify Phone
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
                <Title>Verify Phone</Title>
              </Body>
            </Header>
            <Content
              padder
            >
              <Form style={{ marginTop: 20 }}>
                {/* <View>
                  <Input
                    placeholder="Enter your phone number"
                    value={this.props.phone}
                    onChangeText={this.onPhoneChanged.bind(this)}
                    keyboardType="phone-pad"
                    disabled={true}
                  />
                </View> */}
                <View>
                  <Input
                  placeholder="Enter Code number"
                  value={this.props.verification_code}
                  onChangeText={this.verificationCodeChanged.bind(this)}
                  keyboardType="numeric"
                  disabled={this.props.loading}
                />
                </View>
              </Form>
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

export default connect(mapStateToProps)(VerifyPhoneContainer);
