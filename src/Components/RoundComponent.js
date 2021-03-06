import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Input,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Text,
  Row,
  Col,
  Icon,
  Item,
} from "native-base";
import {
  removeRound,
  resultChanged,
  roundErrorSet,
} from "../Actions";

import styles from "../styles";
import LoadingComponent from '../Components/LoadingComponent';

class RoundComponent extends Component {

  onPressRemoveRound = (index) => {
    const { resultRounds } = this.props;
    const {rounds} = resultRounds;
    if (rounds.length == 1) {
      // alert('You have to add atleast one round');
      this.props.dispatch(roundErrorSet('You have to add atleast one round'));
    } else if (rounds.length-1 != index) {
      this.props.dispatch(roundErrorSet('You have to delete last round first'));
      // alert('You have to delete last round first');
    } else {
      // this.props.dispatch(removeRound(index));
      this.props.removeRound(index);
    }
  }

  onRoundUpdate (text, index, player_id, field) {
    const payload = {
      text, index, player_id, field,
    };
    this.props.dispatch(resultChanged(payload));
  }

  render() {
    const { index, matchDetail, resultRounds} = this.props;
    const { rounds } = resultRounds;
    if (!rounds[index][matchDetail.athlete_one_data.user_id]) {
       <LoadingComponent />
    }
    
    return <Card style={{flexWrap: 'nowrap'}}>
    <CardItem header bordered>
      <Left style={{ marginLeft: -10}}>
        <Text style={{fontWeight:'bold'}}>Round - { index +1}</Text>
      </Left>
      <Right>
        <Icon name="ios-close-circle-outline" style={{color: "#000"}} onPress={() => this.onPressRemoveRound(index)} style={{ paddingLeft: 20}} />
      </Right>
    </CardItem>
    <CardItem>
      <Body>
        <Row style={style.player}>
          <Col>
            <Text style={{fontWeight:'bold'}}>{matchDetail.athlete_one_data.name}</Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Item style={style.rightItem} >
              <Input
                keyboardType="numeric"
                returnKeyType = {"next"}
                placeholder="Control" 
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_one_data.user_id, 'control')} 
                //value={rounds[index][matchDetail.athlete_one_data.user_id]['control']} 
                />
            </Item>
          </Col>
          <Col>
            <Item style={style.leftItem}>
              <Input
                keyboardType="numeric"
                returnKeyType = {"next"}
                placeholder="Knockdowns" 
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_one_data.user_id, 'knock_downs')} 
                //value={rounds[index][matchDetail.athlete_one_data.user_id]['knock_downs']} 
                />
            </Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Item style={style.rightItem}>
              <Input
                keyboardType="numeric"
                returnKeyType = {"next"}
                placeholder="Total Strikes" 
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_one_data.user_id, 'total_strike')} 
                //value={rounds[index][matchDetail.athlete_one_data.user_id]['total_strike']} 
                // value={this.props.total_strike} 
                />
            </Item>
          </Col>
          <Col>
            <Item style={style.leftItem}>
              <Input
                keyboardType="numeric"
                returnKeyType = {"next"}
                placeholder="Significant Strikes"
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_one_data.user_id, 'significant_strike')} 
                //value={rounds[index][matchDetail.athlete_one_data.user_id]['significant_strike']} 
                  // value={this.props.significant_strike} 
                  />
            </Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Item style={style.rightItem}>
              <Input
                keyboardType="numeric"
                returnKeyType = {"next"}
                placeholder="Take Downs" 
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_one_data.user_id, 'take_downs')} 
                //value={rounds[index][matchDetail.athlete_one_data.user_id]['take_downs']} 
                // value={this.props.take_downs} 
                />
            </Item>
          </Col>
          <Col>
            <Item style={style.leftItem}>
              <Input
                keyboardType="numeric"
                returnKeyType = {"next"}
                placeholder="Sub Attempts" 
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_one_data.user_id, 'sub_attempts')} 
                //value={rounds[index][matchDetail.athlete_one_data.user_id]['sub_attempts']} 
                  // value={this.props.significant_strike} 
                  />
            </Item>
          </Col>
        </Row>
      </Body>
    </CardItem>
    <View style={styles.horizontalLine} />
    <CardItem>
    <Body>
        <Row style={style.player}>
          <Col>
            <Text style={{fontWeight:'bold'}}>{matchDetail.athlete_two_data.name}</Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Item style={style.rightItem} >
              <Input
                keyboardType="numeric"
                returnKeyType = {"next"}
                placeholder="Control" 
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_two_data.user_id, 'control')} 
                //value={rounds[index][matchDetail.athlete_two_data.user_id]['control']} 
                />
            </Item>
          </Col>
          <Col>
            <Item style={style.leftItem}>
              <Input
                keyboardType="numeric"
                returnKeyType = {"next"}
                placeholder="Knockdowns" 
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_two_data.user_id, 'knock_downs')} 
                //value={rounds[index][matchDetail.athlete_two_data.user_id]['knock_downs']} 
                />
            </Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Item style={style.rightItem}>
              <Input
                placeholder="Total Strikes" 
                keyboardType="numeric"
                returnKeyType = {"next"}
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_two_data.user_id, 'total_strike')} 
                //value={rounds[index][matchDetail.athlete_two_data.user_id]['total_strike']} 
                // value={this.props.total_strike} 
                />
            </Item>
          </Col>
          <Col>
            <Item style={style.leftItem}>
              <Input
                keyboardType="numeric"
                placeholder="Significant Strikes" 
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_two_data.user_id, 'significant_strike')} 
                //value={rounds[index][matchDetail.athlete_two_data.user_id]['significant_strike']} 
                  // value={this.props.significant_strike} 
                  />
            </Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Item style={style.rightItem}>
              <Input
                keyboardType="numeric"
                returnKeyType = {"next"}
                placeholder="Take Downs" 
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_two_data.user_id, 'take_downs')} 
                //value={rounds[index][matchDetail.athlete_two_data.user_id]['take_downs']} 
                // value={this.props.take_downs} 
                />
            </Item>
          </Col>
          <Col>
            <Item style={style.leftItem}>
              <Input
                keyboardType="numeric"
                returnKeyType={'done'}
                placeholder="Sub Attempts" 
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_two_data.user_id, 'sub_attempts')} 
                //value={rounds[index][matchDetail.athlete_two_data.user_id]['sub_attempts']} 
                  // value={this.props.significant_strike} 
                  />
            </Item>
          </Col>
        </Row>
      </Body>
    </CardItem>
  </Card>;
  }
}

const style = {
  player: {marginBottom: 10},
  rightItem: {marginRight: 5,},
  leftItem: {marginLeft: 5,},
}

// const mapStateToProps = state => {
//   return state.auth;
// };
// OR better is below, equal to above
const mapStateToProps = ({ resultRounds, matchDetail }) => {
  return {resultRounds, matchDetail};
};

export default connect(mapStateToProps)(RoundComponent);