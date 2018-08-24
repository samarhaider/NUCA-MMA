import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
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
} from "native-base";
import { emailChanged, passwordChanged, loginUser } from "../Actions";
import styles from "../styles";
import { style } from "expo/src/Font";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import validateRules, { loginValidation } from "../Components/ValidationRules";
import Wallpaper from "../Components/Wallpaper";
import Logo from "../Components/Logo";

const message = "Welcome Back!"; 

class LoginContainer extends Component {
  onEmailChanged(text) {
    this.props.dispatch(emailChanged(text));
  }
  onPasswordChanged(text) {
    this.props.dispatch(passwordChanged(text));
  }
  onLoginButtonPress() {
    // this.props.navigation.navigate("home");
    
    const { email, password, grant_type, client_id, client_secret } = this.props;
    // // const errors = validateRules(this.props, loginValidation);
    // if (!errors) {
      this.props.dispatch(loginUser({ email, password, username: email, grant_type, client_id, client_secret  }));
    // }
  }
  onRegisterButtonPress() {
    this.props.navigation.navigate("register");
  }
  onForgetPasswordButtonPress() {
    this.props.navigation.navigate("sendCode");
  }

  renderLoginButton() {
    if (this.props.loading) {
      return <Button full>
        <Spinner size="large" color="#fff" />
      </Button>;
    }

    return (
      <Button full onPress={this.onLoginButtonPress.bind(this)} style={styles.authSubmitButton}>
        <Text uppercase={true} >
          Sign In
        </Text>
      </Button>
    );
  }

  render() {
    return <Container >
            <Header style={styles.authHeader}>
              <Body>
                <Title uppercase={true} >LOGIN</Title>
              </Body>
            </Header>
          <Wallpaper>
            <Content padder>
              <KeyboardAwareScrollView
                extraScrollHeight={100}
                enableOnAndroid={true} 
                keyboardShouldPersistTaps='handled'
              >
                <Logo message={message} />
                <Form style={{ margin: 20}} >
                    <Item >
                      <FontAwesome name='user-o' style={styles.loginIcons} />
                      <Input
                        style={{color: "#FFF"}} 
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={this.onEmailChanged.bind(this)}
                        value={this.props.email}
                        disabled={this.props.loading}                      
                        autoCorrect={false}
                        autoCapitalize={false}
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        />
                    </Item>
                  <Item>
                    <SimpleLineIcons name='lock' style={styles.loginIcons} />
                    <Input
                      style={{color: "#FFF"}} 
                      placeholder="Password" 
                      onChangeText={this.onPasswordChanged.bind(this)} 
                      value={this.props.password} 
                      secureTextEntry 
                      disabled={this.props.loading} 
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      returnKeyType={'done'}
                      />
                    </Item>
                  <View>
                    {this.renderLoginButton()}
                  </View>
                  <View style={{alignSelf: 'center'}} >
                    <Button transparent onPress={this.onForgetPasswordButtonPress.bind(this)}>
                      <Text uppercase={false} style={{textDecorationLine: "underline", color: "#FFF"}} >
                        Forgot Password
                      </Text>
                    </Button>
                  </View>
                </Form>
                </KeyboardAwareScrollView>
              </Content>
            </Wallpaper>
          </Container>;
  }
}

const mapStateToProps = ({ auth }) => {
  return auth;
};

export default connect(mapStateToProps)(LoginContainer);
