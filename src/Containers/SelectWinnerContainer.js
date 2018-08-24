import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ImagePicker, Permissions } from "expo";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Platform } from 'react-native';
import {
  ActionSheet,
  Container,
  Content,
  Row,
  Col,
  H1,
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
  Spinner,
} from "native-base";
import Modal from 'react-native-modalbox';
import {
  winnerImageAdd,
  winnerImageRemove,
  onWinnerChanged,
  onWinnerTypeChanged,
  saveMatch,
  modalSuccessResultSubmit,
} from '../Actions';
import styles from "../styles";
import MatchCardComponent from '../Components/MatchCardComponent'

var BUTTONS = ["From Camera", "From	Gallery", "Cancel"];
var CANCEL_INDEX = 2;

class SelectWinnerContainer extends Component {

  componentDidMount() {
    this.props.dispatch(modalSuccessResultSubmit(false))
  }

  closeModal = () => {
    this.props.dispatch(modalSuccessResultSubmit(false))
    this.props.navigation.navigate("home");
  }

  onWinnerChangedValue = payload => {
    this.props.dispatch(onWinnerChanged(payload));
  }
   
  onWinnerTypeChangedValue = payload => {
    this.props.dispatch(onWinnerTypeChanged(payload));
  }

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

  submitResultPress = () => {
    const { resultRounds, selectWinner, matchDetail } = this.props;
    const { rounds } = resultRounds;
    const result = {
      rounds, ...selectWinner, id: matchDetail.id,
    }    
    this.props.dispatch(saveMatch(result));
  }

  openCamera = () => {
    const { selectWinner } = this.props;
    const {imagesLimit, images} = selectWinner;
    if (images.length < imagesLimit) {
      ActionSheet.show(
        {
          options: BUTTONS,
          cancelButtonIndex: CANCEL_INDEX,
          title: "Select Photo"
        },
        buttonIndex => {
          this._pickImage(buttonIndex);
        }
      )
    } else {
      alert(`You cannot add more than ${imagesLimit} images`);
    }

  }

  renderModalSuccess () {
    return (<Modal style={styles.modal} isOpen={this.props.selectWinner.modalSuccess} onClosed={() => this.closeModal()}>
    <Col>
      <SimpleLineIcons name="check" size={80} color="#848484" />
    </Col>
      <H1 style={styles.successText}>Successful!</H1>
    <Col>
      <Text style={styles.modalText}>Your result has been successfully added.</Text>
    </Col>
  </Modal>);
  }

  renderHeader() {
    return <Header>
    <Button transparent onPress={() => this.props.navigation.goBack()}>
      <Icon name="ios-arrow-back" style={{marginLeft: -5}} />
    </Button>
    <Body>
      <Title>Select Winner </Title>
    </Body>
    <Button transparent onPress={() => this.openCamera()}>
      <Icon name="ios-camera" style={{marginRight: -5}} />
    </Button>
  </Header>;
  }

  renderResult(matchDetail) {
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
                      selectedValue={this.props.selectWinner.winner}
                      style={{ width:(Platform.OS === 'ios') ? undefined : '100%' }}
                      onValueChange={this.onWinnerChangedValue.bind(this)}>
                      <Picker.Item label={matchDetail.athlete_one_data.name} value={matchDetail.athlete_one_data.user_id} />
                      <Picker.Item label={matchDetail.athlete_two_data.name} value={matchDetail.athlete_two_data.user_id} />
                    </Picker>
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Item>
                    <Picker placeholder="Win Type" header="Select Win Type" mode="dropdown" 
                      selectedValue={this.props.selectWinner.win_type}
                      style={{ width:(Platform.OS === 'ios') ? undefined : '100%' }}
                      onValueChange={this.onWinnerTypeChangedValue.bind(this)}>
                      <Picker.Item label="KO" value="ko/tko" />
                      <Picker.Item label="Decision" value="dec" />
                      <Picker.Item label="Draw" value="draw" />
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

  renderSubmitButton() {
    if (this.props.selectWinner.loading) {
      return <Button primary full>
        <Spinner size="large" color="#fff" />
      </Button>;
    }

    return (
      <Button primary full onPress={() => this.submitResultPress()}>
        <Text uppercase={true} style={styles.fooButtonText}>Submit</Text>
      </Button>
    );
  }

  renderFooter() {
    return <Footer>
      <FooterTab>
        <Row>
          <Col>
            {this.renderSubmitButton()}
          </Col>
        </Row>
      </FooterTab>
    </Footer>;
  }

  render() {
    const { matchDetail } = this.props;
    return <Container>
          {this.renderHeader()}
          <Content>
            <MatchCardComponent data={{...matchDetail}} />
            {this.renderResult(matchDetail)}
            {this.renderAttachments()}
            {this.renderFooter()}
          </Content>
          {this.renderModalSuccess()}
        </Container>;
  }
}

const mapStateToProps = ({ selectWinner, matchDetail, resultRounds }) => {
  return { selectWinner, matchDetail, resultRounds };
};

export default connect(mapStateToProps)(SelectWinnerContainer);
