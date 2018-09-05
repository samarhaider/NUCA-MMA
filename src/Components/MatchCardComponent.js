import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ImageBackground } from 'react-native';
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
import { S3_BASE_URL } from "../Constants";
const uri = "https://komarketing.com/images/2014/08/linkedin-default.png";
// import bgSrc from '../../assets/bg.png';

class MatchCardComponent extends Component {

  getDayName(date) {
    return moment(date, 'YYYY-MM-DD').format('dddd');    
  }

  getDate(date) {
    return moment(date, "YYYY-MM-DD HH:mm:ss").format("MMM DD, YYYY, h:mm a")
  }

  renderSimpleCardBody() {
    const { data } =  this.props;
    const profile_picture1 = data.athlete_one_data.picture || uri;
    const profile_picture2 = data.athlete_two_data.picture || uri;
    return (<Row>
      <Col size={40} style={style.player}  >
        <Thumbnail large source={{uri: profile_picture1}} style={style.thumbnail} />
        <Text style={{fontWeight:'bold'}}>{data.athlete_one_data.name}</Text>
        <Text note>{data.school_one_data.name}</Text>
      </Col>
      <Col size={20} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }} >
        <Text style={styles.vs} >VS</Text>
      </Col>
      <Col size={40} style={style.player} >
        <Thumbnail large source={{uri: profile_picture2}} style={style.thumbnail} />
        <Text style={{fontWeight:'bold'}}>{data.athlete_two_data.name}</Text>
        <Text note>{data.school_two_data.name}</Text>
      </Col>
    </Row>);
  }

  renderWallpaperCardBody(){
    return (<ImageBackground style={style.bgImage} source={uri}>
      {this.renderSimpleCardBody()}
      </ImageBackground>);
  }

  renderCardBody() {
    const { wallpaper } =  this.props;
    if (wallpaper) {
      // return this.renderWallpaperCardBody();
    }
   return this.renderSimpleCardBody();
  }

  render() {
    const { data } =  this.props;
    return <Card style={{flexWrap: 'nowrap'}}>
    <CardItem header bordered>
      <Body>
        <Text>{this.getDayName(data.schedule.start_time)}</Text>
        <Text note>{this.getDate(data.schedule.start_time)}</Text>
      </Body>
    </CardItem>
    <CardItem>
      {this.renderCardBody()}
    </CardItem>            
  </Card>;
  }
}

const style = {
  thumbnail: { borderColor: "#E8E8E8", borderWidth: 3, marginBottom: 10},
  player: {alignItems:"center"},
  bgImage: {
    flex: 1,
    width: null,
    height: null,
    marginBottom: -10,
  }
}

// const mapStateToProps = state => {
//   return state.auth;
// };
// OR better is below, equal to above
const mapStateToProps = ({ auth }) => {
  return auth;
};

export default connect(mapStateToProps)(MatchCardComponent);