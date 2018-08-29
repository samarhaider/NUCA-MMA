import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Container,
  Content,
  Header,
  List,
  ListItem,
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
} from "../Actions";
import styles from "../styles";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import MatchCardComponent from '../Components/MatchCardComponent'
import RoundComponent from '../Components/RoundComponent'

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
    this.setState({showNextScreen: true});
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
  }

  addRoundWithUserId = () => {
    const { matchDetail } = this.props;
    let roundData = {};
    roundData[matchDetail.athlete_one_data.user_id] =  {...resultObj};
    roundData[matchDetail.athlete_two_data.user_id] =  {...resultObj};
    this.props.dispatch(addRound(roundData));
  }

  _onFinishPress = () => {
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
      alert(`You cannot add more than ${roundsLimit} rounds`);
    }
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

  render() {
    const { resultRounds } = this.props;
    const { match } = this.props.navigation.state.params;
    return <Container>
            {this.renderHeader()}
            <KeyboardAwareScrollView
              extraScrollHeight={100}
              enableOnAndroid={true} 
              keyboardShouldPersistTaps='handled'
            >
              <Content>
                <MatchCardComponent data={{...match}} wallpaper={true} />
                  {resultRounds.rounds.map((data,i) => {
                    return <RoundComponent key={i} index={i} data={data} />
                  })}
                {this.renderFooter()}
              </Content>
            </KeyboardAwareScrollView>
          </Container>;
  }
}

const mapStateToProps = ({ resultRounds, auth, matchDetail }) => {
  return { resultRounds, auth, matchDetail };
};

export default connect(mapStateToProps)(ResultAddContainer);
