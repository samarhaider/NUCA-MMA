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
} from "native-base";
import {
  removeRound,
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

  render() {
    const {index} = this.props;
    
    return <Card>
    <CardItem header bordered>
      <Left>
        <Text>Round - { index +1}</Text>
      </Left>
      <Right>
        <Icon name="close-circle" color="#000" onPress={() => this.onPressRemoveRound(index)} />
      </Right>
    </CardItem>
    <CardItem>
      <Body>
        <Row style={style.player}>
          <Col>
            <Text>Player one</Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Item style={style.rightItem} >
              <Input
                placeholder="Control" 
                // onChangeText={this.onPasswordChanged.bind(this)} 
                // value={this.props.control} 
                />
            </Item>
          </Col>
          <Col>
            <Item style={style.leftItem}>
              <Input
                  placeholder="Knockdowns" 
                  // onChangeText={this.onPasswordChanged.bind(this)} 
                  // value={this.props.knockdowns} 
                  />
            </Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Item style={style.rightItem}>
              <Input
                placeholder="Total Strike" 
                // onChangeText={this.onPasswordChanged.bind(this)} 
                // value={this.props.total_strike} 
                />
            </Item>
          </Col>
          <Col>
            <Item style={style.leftItem}>
              <Input
                  placeholder="Significant Strike" 
                  // onChangeText={this.onPasswordChanged.bind(this)} 
                  // value={this.props.significant_strike} 
                  />
            </Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Item style={style.rightItem}>
              <Input
                placeholder="Take Downs" 
                // onChangeText={this.onPasswordChanged.bind(this)} 
                // value={this.props.total_strike} 
                />
            </Item>
          </Col>
          <Col>
            <Item style={style.leftItem}>
              <Input
                  placeholder="Sub Attempts" 
                  // onChangeText={this.onPasswordChanged.bind(this)} 
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
            <Text>Player Two</Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Item style={style.rightItem}>
              <Input
                placeholder="Control" 
                // onChangeText={this.onPasswordChanged.bind(this)} 
                // value={this.props.control} 
                />
            </Item>
          </Col>
          <Col>
            <Item style={style.leftItem}>
              <Input
                  placeholder="Knockdowns" 
                  // onChangeText={this.onPasswordChanged.bind(this)} 
                  // value={this.props.knockdowns} 
                  />
            </Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Item style={style.rightItem}>
              <Input
                placeholder="Total Strike" 
                // onChangeText={this.onPasswordChanged.bind(this)} 
                // value={this.props.total_strike} 
                />
            </Item>
          </Col>
          <Col>
            <Item style={style.leftItem}>
              <Input
                  placeholder="Significant Strike" 
                  // onChangeText={this.onPasswordChanged.bind(this)} 
                  // value={this.props.significant_strike} 
                  />
            </Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Item style={style.rightItem}>
              <Input
                placeholder="Take Downs" 
                // onChangeText={this.onPasswordChanged.bind(this)} 
                // value={this.props.total_strike} 
                />
            </Item>
          </Col>
          <Col>
            <Item style={style.leftItem}>
              <Input
                  placeholder="Sub Attempts" 
                  // onChangeText={this.onPasswordChanged.bind(this)} 
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
const mapStateToProps = ({ resultRounds, auth }) => {
  return {resultRounds, auth};
};

export default connect(mapStateToProps)(RoundComponent);