import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ImagePicker, Permissions } from "expo";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Platform, BackHandler } from 'react-native';
import {
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
import { connectActionSheet } from '@expo/react-native-action-sheet';
import RNPickerSelect from 'react-native-picker-select';
import {
  winnerImageAdd,
  winnerImageRemove,
  onWinnerChanged,
  onWinnerTypeChanged,
  saveMatch,
  modalSuccessResultSubmit,
} from '../Actions';
import styles from "../styles";
import MatchCardComponent from '../Components/MatchCardComponent';
import LoadingComponent from "../Components/LoadingComponent";
import validateRules, {
  selectWinnerValidation
} from "../Components/ValidationRules";

var BUTTONS = ["From Camera", "From	Gallery", "Cancel"];
var CANCEL_INDEX = 2;

@connectActionSheet
class SelectWinnerContainer extends Component {

  constructor(props) {
    super(props)
    this.inputRefs = {};
    this.inputRefsWinType = {};
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    this.setState({showNextScreen: true, showLoader: true});
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
    this.props.dispatch(modalSuccessResultSubmit(false))
    this.setState({error: ""});
    setTimeout(()=>{
      this.setState({
        showLoader: false,
      });
    }, 1000);
  }

  closeModal = () => {
    this.props.dispatch(modalSuccessResultSubmit(false))
    this.props.navigation.navigate("home");
  }

  closeErrorModal = () => {
    this.setState({error: ""});
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
      const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      
      if (status === 'granted' && cameraRoll.status === 'granted') {
        result = await ImagePicker.launchCameraAsync({
          // allowsEditing: true,
          aspect: [4, 3]
        });
      } else {
        this.setState({error: 'Camera to access was denied'});
        // alert('Camera to access was denied');
      }
    } else if (buttonIndex == 1) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);    
      if (status === 'granted') {
        result = await ImagePicker.launchImageLibraryAsync({
          // allowsEditing: true,
          quality: 0.5,
          aspect: [4, 3]
        });
      } else {
        this.setState({error: 'Gallery to access was denied'});
        // alert('Gallery to access was denied');
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
    const errors = validateRules(selectWinner, selectWinnerValidation);
    if (errors) {
      let errorString = '';
      for( error in errors) {          
        errorString += errors[error][0];
        break;
      }
      this.setState({error: errorString});
      return;
    }
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
      this.props.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: "Select Photo"
      },
      (buttonIndex) => {
          this._pickImage(buttonIndex);
      });
    
      // ActionSheet.show(
      //   {
      //     options: BUTTONS,
      //     cancelButtonIndex: CANCEL_INDEX,
      //     title: "Select Photo"
      //   },
      //   buttonIndex => {
      //     this._pickImage(buttonIndex);
      //   }
      // )
    } else {
      this.setState({error: `You cannot add more than ${imagesLimit} images`});
      // alert(`You cannot add more than ${imagesLimit} images`);
    }

  }

  renderModalSuccess () {
    return (<Modal style={styles.modal} isOpen={this.props.selectWinner.modalSuccess} backdropPressToClose={false}>
        <SimpleLineIcons name="check" size={80} color="#848484" />
        {/* <H1 style={styles.successText}>Successful!</H1> */}
        <Text style={styles.modalText}>Your result has been successfully added.</Text>
      <Col style={styles.modelButtonEnd} >
        <Button onPress={() => this.closeModal()}>
          <Text style={{}}>OK</Text>
        </Button>
      </Col>
    </Modal>);
  }

  renderModalError () {
    // if (this.props.error) {
    //   this.setState({error: this.props.error});
    // }
    if (!this.state.error) {
      return;
    }
    return (<Modal style={styles.modalError} isOpen={true} backdropPressToClose={false} onClosed={() => this.closeErrorModal()}>
        <H1 style={styles.modalErrorHeader}>Alert</H1>
        <Text style={styles.modalText}>{this.state.error}</Text>
        <Col style={styles.modelButtonEnd} >
          <Button style={styles.modalErrorButton} onPress={() => this.closeErrorModal()}>
            <Text style={styles.modalTextError}>OK</Text>
          </Button>
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

  renderSelectWinnerDropdown(matchDetail) {

    let items = [];
    if (Platform.OS !== 'ios') {
      items.push({label: "Select a Winner", value: null})
    }
    items.push({label: matchDetail.athlete_one_data.name, value: matchDetail.athlete_one_data.user_id})
    items.push({label: matchDetail.athlete_two_data.name, value: matchDetail.athlete_two_data.user_id})

    if (Platform.OS === 'ios') {
      return (<RNPickerSelect
        placeholder={{
            label: 'Select a Winner',
            value: null,
        }}
        items={items}
        onValueChange={this.onWinnerChangedValue.bind(this)}
        onUpArrow={() => {
            this.inputRefs.name.focus();
        }}
        onDownArrow={() => {
            this.inputRefs.picker2.togglePicker();
        }}
        style={{ ...pickerSelectStyles }}
        value={this.props.selectWinner.winner}
        ref={(el) => {
            this.inputRefs.picker = el;
        }}
    />);
    }

    let serviceItems = items.map( (item, i) => {
      return <Picker.Item key={i} value={item.value} label={item.label} />
    });

    return (<Item>
      <Picker 
        placeholder="Select a Winner"
        header="Select a Winner" mode="dropdown" 
        selectedValue={this.props.selectWinner.winner}
        style={{ width:(Platform.OS === 'ios') ? undefined : '100%' }}
        itemStyle={{margin:10}}
        onValueChange={this.onWinnerChangedValue.bind(this)}>
        {serviceItems}
      </Picker>
    </Item>);

  }

  renderSelectWinTypeDropdown() {
    let itemsWinType = [];
    if (Platform.OS !== 'ios') {
      itemsWinType.push({label: "Select Win Type", value: null})
    }
    itemsWinType.push({label: "KO", value: "ko/tko"})
    itemsWinType.push({label: "Decision", value: "dec"})
    itemsWinType.push({label: "Draw", value: "draw"})

    if (Platform.OS === 'ios') {
      return(<RNPickerSelect
                placeholder={{
                    label: 'Select Win Type',
                    value: null,
                }}
                items={itemsWinType}
                onValueChange={this.onWinnerTypeChangedValue.bind(this)}
                onUpArrow={() => {
                    this.inputRefsWinType.name.focus();
                }}
                onDownArrow={() => {
                    this.inputRefsWinType.picker2.togglePicker();
                }}
                style={{ ...pickerSelectStyles }}
                value={this.props.selectWinner.win_type}
                ref={(el) => {
                    this.inputRefsWinType.picker = el;
                }}
            />
      );
    }

    let serviceItemsWinType = itemsWinType.map( (item, i) => {
      return <Picker.Item key={i} value={item.value} label={item.label} />
    });

    return (<Item>
              <Picker placeholder="Win Type" header="Select Win Type" mode="dropdown" 
                selectedValue={this.props.selectWinner.win_type}
                style={{ width:(Platform.OS === 'ios') ? undefined : '100%' }}
                itemStyle={{margin:10}}
                onValueChange={this.onWinnerTypeChangedValue.bind(this)}>
                {serviceItemsWinType}
              </Picker>
            </Item>);
  }


  renderResult(matchDetail) {
    return <Card style={{flexWrap: 'nowrap'}}>
            <CardItem header>
              <Left>
                <Text>Result</Text>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <Body>
              <Row>
                <Col>
                {this.renderSelectWinnerDropdown(matchDetail)}                  
                </Col>
              </Row>
              <Row>
                <Col>
                {this.renderSelectWinTypeDropdown()}                  
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
    return <Footer style={{marginTop: 70}}>
      <FooterTab>
        <Row>
          <Col>
            {this.renderSubmitButton()}
          </Col>
        </Row>
      </FooterTab>
    </Footer>;
  }

  renderBody() {
    if (this.state.showLoader) {
      return <LoadingComponent />;
    }
    const { matchDetail } = this.props;
    return (<Content>
      <MatchCardComponent data={{...matchDetail}} wallpaper={true} />
      {this.renderResult(matchDetail)}
      {this.renderAttachments()}
      {this.renderFooter()}
    </Content>);
  }

  render() {
    return <Container>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderModalSuccess()}
          {this.renderModalError()}
        </Container>;
  }
}

const mapStateToProps = ({ selectWinner, matchDetail, resultRounds }) => {
  return { selectWinner, matchDetail, resultRounds };
};

const pickerSelectStyles = {
  inputIOS: {
      fontSize: 16,
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      borderWidth: 1,
      borderColor: '#E8E8E8',
      backgroundColor: 'white',
      color: 'black',
      width: '100%',
      marginBottom: 20,
      borderRadius: 5, // Added
      paddingLeft: 5, // Added
  
  },
};

export default connect(mapStateToProps)(SelectWinnerContainer);
