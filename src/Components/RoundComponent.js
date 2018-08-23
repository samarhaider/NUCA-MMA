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
  H2,
  Row,
  Col,
  Icon,
  Item,
  Button,
} from "native-base";
import {
  removeRound,
  resultChanged,
} from "../Actions";

import styles from "../styles";
import commonColor from "../../native-base-theme/variables/commonColor";

class RoundComponent extends Component {

  onPressRemoveRound = (index) => {
    const { resultRounds } = this.props;
    const {rounds} = resultRounds;
    if (rounds.length > 1) {
      this.props.dispatch(removeRound(index));
    } else {
      alert('You have to add atleast one round');
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

    return <Card>
    <CardItem header bordered>
      <Left style={{ marginLeft: -10}}>
        <Text>Round - { index +1}</Text>
      </Left>
      <Right>
        <Icon name="ios-close-circle-outline" style={{color: "#000"}} onPress={() => this.onPressRemoveRound(index)} style={{ paddingLeft: 20}} />
      </Right>
    </CardItem>
    <CardItem>
      <Body>
        <Row style={style.player}>
          <Col>
            <Text>{matchDetail.athlete_one_data.name}</Text>
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
                value={rounds[index][matchDetail.athlete_one_data.user_id]['control']} 
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
                value={rounds[index][matchDetail.athlete_one_data.user_id]['knock_downs']} 
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
                placeholder="Total Strike" 
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_one_data.user_id, 'total_strike')} 
                value={rounds[index][matchDetail.athlete_one_data.user_id]['total_strike']} 
                // value={this.props.total_strike} 
                />
            </Item>
          </Col>
          <Col>
            <Item style={style.leftItem}>
              <Input
                keyboardType="numeric"
                returnKeyType = {"next"}
                placeholder="Significant Strike" 
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_one_data.user_id, 'significant_strike')} 
                value={rounds[index][matchDetail.athlete_one_data.user_id]['significant_strike']} 
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
                value={rounds[index][matchDetail.athlete_one_data.user_id]['take_downs']} 
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
                value={rounds[index][matchDetail.athlete_one_data.user_id]['sub_attempts']} 
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
            <Text>{matchDetail.athlete_two_data.name}</Text>
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
                value={rounds[index][matchDetail.athlete_two_data.user_id]['control']} 
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
                value={rounds[index][matchDetail.athlete_two_data.user_id]['knock_downs']} 
                />
            </Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Item style={style.rightItem}>
              <Input
                placeholder="Total Strike" 
                keyboardType="numeric"
                returnKeyType = {"next"}
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_two_data.user_id, 'total_strike')} 
                value={rounds[index][matchDetail.athlete_two_data.user_id]['total_strike']} 
                // value={this.props.total_strike} 
                />
            </Item>
          </Col>
          <Col>
            <Item style={style.leftItem}>
              <Input
                keyboardType="numeric"
                placeholder="Significant Strike" 
                onChangeText={(text) => this.onRoundUpdate(text, index, matchDetail.athlete_two_data.user_id, 'significant_strike')} 
                value={rounds[index][matchDetail.athlete_two_data.user_id]['significant_strike']} 
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
                value={rounds[index][matchDetail.athlete_two_data.user_id]['take_downs']} 
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
                value={rounds[index][matchDetail.athlete_two_data.user_id]['sub_attempts']} 
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