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
import moment from 'moment/src/moment';
import styles from '../styles';
const uri = "https://komarketing.com/images/2014/08/linkedin-default.png";

class MatchCardComponent extends Component {

  getDayName(date) {
    return moment(date, 'YYYY-MM-DD').format('dddd');    
  }

  render() {
    const { data } =  this.props;
    const profile_picture1 = data.athlete_one_data.profile_picture || uri;
    const profile_picture2 = data.athlete_two_data.profile_picture || uri;
    return <Card>
    <CardItem header bordered>
      <Body>
        <Text>{this.getDayName(data.schedule.start_time)}</Text>
        <Text note>{data.schedule.start_time}</Text>
      </Body>
    </CardItem>
    <CardItem>
      <Row>
        <Col size={40} style={style.player}  >
          <Thumbnail large source={{uri: profile_picture1}} style={style.thumbnail} />
          <Text>{data.athlete_one_data.name}</Text>
          <Text note>{data.athlete_one_data.address}</Text>
        </Col>
        <Col size={20} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }} >
          <Text style={styles.vs} >VS</Text>
        </Col>
        <Col size={40} style={style.player} >
          <Thumbnail large source={{uri: profile_picture2}} style={style.thumbnail} />
          <Text>{data.athlete_two_data.name}</Text>
          <Text note>{data.athlete_two_data.address}</Text>
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