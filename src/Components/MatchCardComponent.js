import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardItem,
  Body,
  Text,
  H2,
  Row,
  Col,
  Thumbnail,  
} from "native-base";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
const uri = "https://lh3.googleusercontent.com/--ToX-7uzoRY/AAAAAAAAAAI/AAAAAAAAAAA/APUIFaMid6l1t5Bl2ItSCzDcqx5PtotgWg/mo/photo.jpg?sz=46";

class MatchCardComponent extends Component {

  render() {
    return <Card>
    <CardItem header bordered>
      <Body>
        <Text>Monday</Text>
        <Text note>Mar 5, 2018, 08:00 PM</Text>
      </Body>
    </CardItem>
    <CardItem>
      <Row>
        <Col size={40} style={style.player}  >
          <Thumbnail large source={{uri: uri}} style={style.thumbnail} />
          <Text>Player One</Text>
          <Text note>City/Town</Text>
        </Col>
        <Col size={20} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }} >
          <Text style={{color: "#CECECE", fontSize: 25, fontWeight:"800"}} >VS</Text>
        </Col>
        <Col size={40} style={style.player} >
          <Thumbnail large source={{uri: uri}} style={style.thumbnail} />
          <Text>Player Two</Text>
          <Text note>City/Town</Text>
        </Col>
      </Row>
    </CardItem>            
  </Card>;
  }
}

const style = {
  thumbnail: { borderColor: "#E8E8E8", borderWidth: 3, marginBottom: 10},
  player: {alignItems:"center"},
}

// const mapStateToProps = state => {
//   return state.auth;
// };
// OR better is below, equal to above
const mapStateToProps = ({ auth }) => {
  return auth;
};

export default connect(mapStateToProps)(MatchCardComponent);