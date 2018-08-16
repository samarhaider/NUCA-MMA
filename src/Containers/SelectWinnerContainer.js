import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ImagePicker, Permissions } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from 'react-native';
import {
  ActionSheet,
  Container,
  Content,
  Row,
  Col,
  Button,
  Card,
  CardItem,
  Item,
  Text,
  Picker,
  Icon,
  Header,
  Title,
  Body,
  Left,
  Footer,
  FooterTab,
  View,
  Thumbnail,
} from "native-base";
import {
  winnerImageAdd,
  winnerImageRemove,
} from '../Actions';
import styles from "../styles";
import MatchCardComponent from '../Components/MatchCardComponent'

var BUTTONS = ["From Camera", "From	Gallery", "Cancel"];
var CANCEL_INDEX = 2;

class SelectWinnerContainer extends Component {

  _pickImage = async buttonIndex => {

    let result = { cancelled: true };
    if (buttonIndex == 0) {

      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === 'granted') {
        result = await ImagePicker.launchCameraAsync({
          // allowsEditing: true,
          aspect: [4, 3]
        });
      } else {
        alert('Camera to access was denied');        
      }
    } else if (buttonIndex == 1) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);    
      if (status === 'granted') {
        result = await ImagePicker.launchImageLibraryAsync({
          // allowsEditing: true,
          aspect: [4, 3]
        });
      } else {
        alert('Gallery to access was denied');        
      }
    }
    if (!result.cancelled) {
      this.props.dispatch(winnerImageAdd(result));
    }
  };

  removeImage = index => {
    this.props.dispatch(winnerImageRemove(index));
  }

  renderHeader() {
    return <Header>
    <Button transparent onPress={() => this.props.navigation.goBack()}>
      <Icon name="arrow-back" />
    </Button>
    <Body>
      <Title>Select Winner </Title>
    </Body>
    <Button transparent onPress={() => ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: "Select Photo"
      },
      buttonIndex => {
        this._pickImage(buttonIndex);
      }
    )}>
      <Icon name="camera" />
    </Button>
  </Header>;
  }

  renderResult() {
    return <Card>
            <CardItem header>
              <Left>
                <Text>Result</Text>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <Body>
              <Row>
                <Col>
                  <Item>
                    <Picker 
                      placeholder="Select a Winner"
                      header="Select a Winner" mode="dropdown" 
                      selectedValue1={this.props.winner_id}
                      style={{ width:(Platform.OS === 'ios') ? undefined : '100%' }}
                      // onValueChange={this.onCityNameChanged.bind(this)}
                      disabled={this.props.loading}>
                      <Picker.Item label="Player One" value={1} />
                      <Picker.Item label="Player Two" value={2} />
                    </Picker>
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Item>
                    <Picker placeholder="Win Type" header="Select Win Type" mode="dropdown" 
                      selectedValue1={this.props.win_type}
                      style={{ width:(Platform.OS === 'ios') ? undefined : '100%' }}
                      // onValueChange={this.onCityNameChanged.bind(this)}
                      disabled={this.props.loading}>
                      <Picker.Item label="KO" value="KO" />
                      <Picker.Item label="Decision" value="Decision" />
                      <Picker.Item label="Draw" value="Draw" />
                    </Picker>
                  </Item>
                </Col>
              </Row>
            </Body>
            </CardItem>              
          </Card>;
  }

  renderAttachmentImages(img, i) {
    return (<View key={i} >
        <Button transparent onPress={() => this.removeImage(i)} style={{ marginTop: -20,  zIndex: 1}}>
          <MaterialIcons name="cancel" fontSize={20} style={{  paddingLeft: 50}} />
        </Button>
        <Thumbnail source={{uri: img.uri}} square style={{marginRight: 10, marginTop: -25}} />
      </View>);
    // return (<ImageBackground source={{uri: img.uri}} key={i} style={{marginRight: 10, width:50, height:50}}>
    //   <MaterialIcons name="cancel" fontSize={20} style={{  paddingLeft: 40, paddingBottom:-70}} />
    //   {/* <Thumbnail source={{uri: img.uri}} square key={i} style={{marginRight: 10}} /> */}
    // </ImageBackground>);
  }
  renderAttachments() {
    const { selectWinner } = this.props;
    const { images } = selectWinner;
    return <Card>
            <CardItem header>
              <Left>
                <Text>Attachments</Text>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <Body>
              {/* <Row alignSelf="flex-end"> */}
              <Row alignSelf="flex-start">
                {images.map((img,i) => {
                  return this.renderAttachmentImages(img, i)
                })}                
              </Row>
            </Body>
            </CardItem>              
          </Card>;
  }

  renderFooter() {
    return <Footer>
      <FooterTab>
        <Row>
          <Col>
          <Button primary full>
            <Text uppercase={true} style={styles.fooButtonText}>Submit</Text>
          </Button>
          </Col>
        </Row>
      </FooterTab>
    </Footer>;
  }

  render() {
    return <Container>
          {this.renderHeader()}
          <Content>
            <MatchCardComponent />
            {this.renderResult()}
            {this.renderAttachments()}
            {this.renderFooter()}
          </Content>
        </Container>;
  }
}

const mapStateToProps = ({ selectWinner }) => {
  return {selectWinner};
};

export default connect(mapStateToProps)(SelectWinnerContainer);
