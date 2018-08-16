import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ImageBackground } from 'react-native';
import {
  Container,
  Root,
  Content,
  Header,
  Button,
  Spinner,
  View,
  Input,
  Text,
  Form,
  Label,
  H1,
  CheckBox,
  Body,
  Footer,
  FooterTab,
  Icon,
  Title,
  Picker,
  Item,
  StyleProvider
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import {
  phoneChanged,
  emailChanged,
  passwordChanged,
  confirmPasswordChanged,
  firstNameChanged,
  lastNameChanged,
  cityNameChanged,
  registerUser
} from "../Actions";
import styles from "../styles";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import validateRules, { registerValidation } from "../Components/ValidationRules";

class RegisterContainer extends Component {
  onPhoneChanged(text) {
    this.props.dispatch(phoneChanged(text));
  }
  onEmailChanged(text) {
    this.props.dispatch(emailChanged(text));
  }
  onPasswordChanged(text) {
    this.props.dispatch(passwordChanged(text));
  }
  onConfirmPasswordChanged(text) {
    this.props.dispatch(confirmPasswordChanged(text));
  }
  onFirstNameChanged(text) {
    this.props.dispatch(firstNameChanged(text));
  }
  onLastNameChanged(text) {
    this.props.dispatch(lastNameChanged(text));
  }
  onCityNameChanged(text) {
    this.props.dispatch(cityNameChanged(text));
  }
  onRegisterButtonPress() {
    // const errors = validateRules(this.props, registerValidation);
    // if (!errors) {
      this.props.dispatch(registerUser(this.props));
      // this.props.navigation.navigate("phoneVerification");
    // }
  }

  onLoginButtonPress() {
    this.props.navigation.navigate("login");
  }

  renderRegisterButton() {
    if (this.props.loading) {
      return <Button info full>
          <Spinner size="large" color="white" />
        </Button>;
    }

    return (
      <Button info full onPress={this.onRegisterButtonPress.bind(this)}>
        <Text uppercase={false} style={styles.authFooterText}>
          Register
        </Text>
      </Button>
    );
  }
  renderAcceptCheckbox() {
    return (
      <View>
        <CheckBox checked={false} />
        <Body>
          <Text>Accept terms and Conditions</Text>
        </Body>
      </View>
    );
  }

  render() {
    return <StyleProvider style={getTheme(commonColor)}>
        <Root>
          <Container>
            <Header>
              <Body style={styles.headerBody}>
                <Title>Register</Title>
              </Body>
            </Header>
            <Content padder contentContainerStyle1={{ justifyContent: "center", flex: 1 }} enableAutoAutomaticScroll={true}>
              <Form>
                <View style={{ marginBottom: 10 }}> 
                <Item rounded style={{backgroundColor:'white'}}>
                  <Icon active name='md-person' /> 
                  <Input placeholder="First Name" value={this.props.firstname} onChangeText={this.onFirstNameChanged.bind(this)} disabled={this.props.loading} />
                </Item>
                  </View>
                <View style={{ marginBottom: 10 }}>
                <Item rounded style={{backgroundColor:'white'}}>
                  <Icon active name='md-person' /> 
                  <Input placeholder="Last Name" value={this.props.lastname} onChangeText={this.onLastNameChanged.bind(this)} disabled={this.props.loading} />
                  </Item>
                </View>
                <View style={{ marginBottom: 10 }}>
                <Item rounded style={{backgroundColor:'white'}}>
                  <Icon active name='md-at' /> 
                  <Input placeholder="Email ID" value={this.props.email} onChangeText={this.onEmailChanged.bind(this)} keyboardType="email-address" disabled={this.props.loading} />
                  </Item>
                </View>
                <View style={{ marginBottom: 10 }}>
                <Item rounded style={{backgroundColor:'white'}}>
                  <Icon active name='md-lock' /> 
                  <Input placeholder="Password" value={this.props.password} onChangeText={this.onPasswordChanged.bind(this)} secureTextEntry disabled={this.props.loading} />
                  </Item>
                </View>
                <View style={{ marginBottom: 10 }}>
                <Item rounded style={{backgroundColor:'white'}}>
                  <Icon active name='md-lock' /> 
                  <Input placeholder="Confirm Password" value={this.props.confirm_password} onChangeText={this.onConfirmPasswordChanged.bind(this)} secureTextEntry disabled={this.props.loading} />
                </Item>
                </View>
                <View style={{ marginBottom: 10 }}>
                <Item rounded style={{backgroundColor:'white'}}>
                  <Icon active name='md-call' /> 
                  <Input placeholder="Phone" value={this.props.phone} onChangeText={this.onPhoneChanged.bind(this)} disabled={this.props.loading} keyboardType="phone-pad" />
                </Item>
                </View>
                <View style={{ marginBottom: 10 }}>
                <Item rounded style={{backgroundColor:'white'}}>
                  <Icon active name='md-pin' /> 
                  <Picker iosHeader="Choose a City" mode="dropdown" selectedValue={this.props.city_id} onValueChange={this.onCityNameChanged.bind(this)} disabled={this.props.loading}>
                  <Item label="Longueuil, QC" value={1} />
<Item label="Regina, SK" value={2} />
<Item label="Surrey, BC" value={3} />
<Item label="Vaughan, ON" value={4} />
<Item label="St. Thomas, ON" value={5} />
<Item label="Coquitlam, BC" value={6} />
<Item label="Whitby, ON" value={7} />
<Item label="Richmond, BC" value={8} />
<Item label="St. John's, NL" value={9} />
<Item label="Pembroke, ON" value={10} />	
<Item label="Winnipeg, MB" value={11} />	
<Item label="High River, AB" value={12} />	
<Item label="Lévis, QC" value={13} />
<Item label="Fredericton, NB" value={14} />
<Item label="Longueuil, QC" value={15} />
<Item label="VVal-d'Or, QC" value={16} />
<Item label="Markham, ON" value={17} />
<Item label="Burnaby, BC" value={18} />
<Item label="Barrie, ON" value={19} />
<Item label="Saint John, NB" value={20} />
<Item label="Burlington, ON" value={21} />
<Item label="Nanaimo, BC" value={22} />
<Item label="St. Catharines, ON" value={23} />
<Item label="Fort McMurray, AB" value={24} />
<Item label="East York, Toronto, ON" value={25} />	
<Item label="Chatham-Kent, ON" value={26} />
<Item label="Vernon, BC" value={27} />	
<Item label="Mississauga, ON" value={28} />
<Item label="Victoria, BC" value={29} />
<Item label="St. John's, NL" value={30} />	
<Item label="Saskatoon, SK" value={31} />
<Item label="Penticton, BC" value={32} />
<Item label="Halifax, NS" value={33} />	
<Item label="Brampton, ON" value={34} />	
<Item label="Edmonton, AB" value={35} />	
<Item label="Milton, ON" value={36} />
<Item label="Major's Hill Park, Ottawa, ON" value={37} />
<Item label="Hamilton, ON" value={38} />	
<Item label="Windsor, ON" value={39} />	
<Item label="Quebec, QC" value={40} />	
<Item label="Welland, ON" value={41} />	
<Item label="Chilliwack, BC" value={42} />	
<Item label="Red Deer, AB" value={43} />
<Item label="Greater Sudbury, ON" value={44} />
<Item label="Moncton, NB" value={45} />
<Item label="Orillia, ON" value={46} />
<Item label="Richmond Hill, Ontario" value={47} />
<Item label="Kelowna, BC" value={48} />
                  </Picker>
                  </Item>
                </View>
              </Form>
            </Content>
            <Footer>
              <FooterTab>{this.renderRegisterButton()}</FooterTab>
            </Footer>
          </Container>
        </Root>
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

export default connect(mapStateToProps)(RegisterContainer);
