import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Header,
  Body,
  Button,
  Spinner,
  Input,
  Text,
  Form,
  Footer,
  FooterTab,
  View,
  Title,
  StyleProvider
} from "native-base";
import {
  passwordChanged,
  confirmPasswordChanged,
  passwordResetCodeChanged,
  changePassword,
} from "../Actions";
import styles from "../styles";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import validateRules, {
  resetPasswordValidation
} from "../Components/ValidationRules";

class ResetPasswordContainer extends Component {
  onSubmitButtonPress() {
    // const errors = validateRules(this.props, resetPasswordValidation);
    // if (!errors) {
      const { phone, code, password, password_confirmation} = this.props;
      this.props.dispatch(changePassword({ verification_code: code, phone, password, password_confirmation }));
    //   this.props.navigation.navigate("login");
    // }
  }

  verificationCodeChanged(text) {
    this.props.dispatch(passwordResetCodeChanged(text));
  }
  onPasswordChanged(text) {
    this.props.dispatch(passwordChanged(text));
  }
  onConfirmPasswordChanged(text) {
    this.props.dispatch(confirmPasswordChanged(text));
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
          Submit
        </Text>
      </Button>
    );
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <Header>
            <Body style={styles.headerBody}>
              <Title>Reset Password</Title>
            </Body>
          </Header>
          <Content
            padder
            contentContainerStyle2={{ justifyContent: "center", flex: 1 }}
          >
            <Form style={{ marginTop: 20 }}>
              <View>
                <Input
                  placeholder="Enter Code number"
                  value={this.props.code}
                  onChangeText={this.verificationCodeChanged.bind(this)}
                  keyboardType="numeric"
                  disabled={this.props.loading}
                />
              </View>
              <View>
                <Input
                  placeholder="Password"
                  value={this.props.password}
                  onChangeText={this.onPasswordChanged.bind(this)}
                  secureTextEntry
                  disabled={this.props.loading}
                />
              </View>
              <View>
                <Input
                  placeholder="Confirm Password"
                  value={this.props.password_confirmation}
                  onChangeText={this.onConfirmPasswordChanged.bind(this)}
                  secureTextEntry
                  disabled={this.props.loading}
                />
              </View>
            </Form>
          </Content>
          <Footer>
            <FooterTab>{this.renderSubmitButton()}</FooterTab>
          </Footer>
        </Container>
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

export default connect(mapStateToProps)(ResetPasswordContainer);
