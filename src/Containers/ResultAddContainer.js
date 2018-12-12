import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { BackHandler, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Container,
  Content,
  Header,
  H1,
  Body,
  Title,
  Button,
  Text,
  Row,
  Col,
  Icon,
  Footer,
  FooterTab,
} from "native-base";
import {
  setRoundInitial,
  addRound,
  roundErrorEmpty,
  roundErrorSet,
  removeRound,
} from "../Actions";
import styles from "../styles";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import MatchCardComponent from '../Components/MatchCardComponent'
import RoundComponent from '../Components/RoundComponent'
import LoadingComponent from "../Components/LoadingComponent";
import validateRules, {
  addRoundValidation
} from "../Components/ValidationRules";

const resultObj = {
  control: '',
  knock_downs: '',
  total_strike: '',
  significant_strike: '',
  take_downs: '',
  sub_attempts: '',
}
class ResultAddContainer extends Component {

  constructor(props) {
    super(props)
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
    this.props.dispatch(setRoundInitial());
    this.addRoundWithUserId();
    setTimeout(()=> {
      this.setState({
        showLoader: false,
      });
    }, 1000);
  }

  addRoundWithUserId = () => {
    const { matchDetail } = this.props;
    let roundData = {};
    roundData[matchDetail.athlete_one_data.user_id] =  {...resultObj};
    roundData[matchDetail.athlete_two_data.user_id] =  {...resultObj};
    this.props.dispatch(addRound(roundData));
  }

  _onFinishPress = () => {
    let goToNextScreen = true;
    const { resultRounds, matchDetail } = this.props;
    const { rounds } = resultRounds;
    for (i = 0; i < rounds.length; i++) {
      for (user_id in rounds[i]) {
        let errors = null;
        let errorString = '';
        errors = validateRules(rounds[i][user_id], addRoundValidation);
        const player = (matchDetail.athlete_one_data.user_id == user_id) ? matchDetail.athlete_one_data.name: matchDetail.athlete_two_data.name;
        errorString = `${player}, Round ${i+1}
`;
        for( error in errors) {
          errorString += errors[error][0];
          this.props.dispatch(roundErrorSet(errorString));
          goToNextScreen = false; 
          break;
        }
      }
    }

    if (!goToNextScreen) {
      return false;
    }
    
    if (this.state.showNextScreen) {
      // enable after 3 second
      setTimeout(()=>{
        this.setState({
          showNextScreen: true,
      });
    }, 3000);
      this.setState({showNextScreen: false});
      const { match } = this.props.navigation.state.params;
      this.props.navigation.navigate("selectWinner", {match});
    }
  }

  onPressAddRound = () => {
    const { resultRounds } = this.props;
    const {roundsLimit, rounds} = resultRounds;
    if (rounds.length < roundsLimit) {
        this.addRoundWithUserId();
    } else {
      const errorString = `You cannot add more than ${roundsLimit} rounds`;
      // alert(errorString);
      this.props.dispatch(roundErrorSet(errorString));
    }
  }

  removeRoundConfirm = (index) => {
    this.setState({deleteRound: index +1});
  }

  removeRoundAndCloseModal = () => {
    const { deleteRound }= this.state;
    this.props.dispatch(removeRound(deleteRound-1));
    this.setState({deleteRound: 0});
  }

  closeErrorModal = () => {
    this.props.dispatch(roundErrorEmpty());
  }

  renderModalError () {
    const { error } = this.props.resultRounds;
    if (!error) {
      return;
    }
    return (<Modal style={styles.modalError} isOpen={true} backdropPressToClose={false}>
        <H1 style={styles.modalErrorHeader}>Alert</H1>
        <Text style={styles.modalText}>{error}</Text>
        <Col style={styles.modelButtonEnd} >
          <Button style={styles.modalErrorButton} onPress={() => this.closeErrorModal()}>
            <Text style={styles.modalTextError}>OK</Text>
          </Button>
        </Col>
    </Modal>);
  }

  renderModalConfirm () {
    const { deleteRound } = this.state;
    if (!deleteRound) {
      return;
    }
    return (<Modal style={styles.modalError} isOpen={true} backdropPressToClose={false} >
        <H1 style={styles.modalErrorHeader}>Alert</H1>
        <Text style={styles.modalText}>Do you want to Remove Round {deleteRound}?</Text>
        <Col style={styles.modelButtonEnd} >
        <Row>
          <Button style={{...styles.modalErrorButton, marginRight: 10, marginTop: 80}} onPress={() => this.setState({deleteRound: 0})}>
            <Text style={styles.modalTextError}>No</Text>
          </Button>
          <Button style={{...styles.modalErrorButton, marginRight: 10, marginTop: 80, backgroundColor: "#da0011"}} onPress={this.removeRoundAndCloseModal}>
            <Text style={styles.modalTextError}>Yes</Text>
          </Button>
        </Row>
        </Col>
    </Modal>);
  }
  
  renderHeader() {
    return <Header>
      <Button transparent onPress={() => this.props.navigation.goBack()}>
        <Icon name="ios-arrow-back" style={{marginLeft: -5}}/>
      </Button>
      <Body>
        <Title>Add Results</Title>
      </Body>
      <Button transparent>
        <Text></Text>
      </Button>
    </Header>;
  }

  renderFooter() {
    return (<Footer>
      <FooterTab>
        <Row>
          <Col>
            <Button dark full onPress={() => this.onPressAddRound()}>
              <Text uppercase={true} style={styles.fooButtonText}>Add Round</Text>
            </Button>
          </Col>
          <Col>
            <Button primary full onPress={() => this._onFinishPress()}>
              <Text  uppercase={true}  style={styles.fooButtonText}>Finish</Text>
            </Button>
          </Col>
        </Row>
      </FooterTab>
    </Footer>);
  }

  renderContent() {
    if (this.state.showLoader) {
      return <LoadingComponent />;
    }
    
    const { resultRounds } = this.props;
    const { match } = this.props.navigation.state.params;
    if (Platform.OS === 'ios') {
      return (
        <Content>
          <MatchCardComponent data={{...match}} wallpaper={true} />
            {resultRounds.rounds.map((data,i) => {
              return <RoundComponent key={i} index={i} data={data} removeRound={(index) => this.removeRoundConfirm(index)} />
            })}
          {this.renderFooter()}
        </Content>)
    }

    return (
      <Content>
        <KeyboardAwareScrollView
          extraHeight={150}
          enableOnAndroid={true} 
          keyboardShouldPersistTaps='handled'
        >
          <MatchCardComponent data={{...match}} wallpaper={true} />
            {resultRounds.rounds.map((data,i) => {
              return <RoundComponent key={i} index={i} data={data} removeRound={(index) => this.removeRoundConfirm(index)} />
            })}
          {this.renderFooter()}
        </KeyboardAwareScrollView>
      </Content>);
  }

  renderBody() {    
    if (Platform.OS === 'ios') {
      return this.renderContent()
    }
    return (<KeyboardAwareScrollView
      extraHeight={150}
      enableOnAndroid={true} 
      keyboardShouldPersistTaps='handled'
    >
    {this.renderContent()}
    </KeyboardAwareScrollView>)
  }

  render() {
    return <Container>
            {this.renderHeader()}
            {this.renderContent()}
            {this.renderModalError()}
            {this.renderModalConfirm()}
          </Container>;
  }
}

const mapStateToProps = ({ resultRounds, auth, matchDetail }) => {
  return { resultRounds, auth, matchDetail };
};

export default connect(mapStateToProps)(ResultAddContainer);
