import React, { Component } from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import {
  Text,
  List,
  ListItem,
  Grid,
  Col,
  Row,
  Button,
} from "native-base";
import styles from "../styles";

class RequestsListComponent extends Component {
  onItemButtonPress() {
    this.props.navigation.navigate("fovorDetail");
  }

  renderListItem() {
    return <ListItem style={{ marginLeft: 0, paddingTop: 0, paddingBottom: 0 }
          // paddingLeft: 0
        } onPress={this.onItemButtonPress.bind(this)}>
        <Grid>
          <Col style={{ flex: 2, backgroundColor: "#00CE9F" }}>
            <Image source={{ uri: styles.testImageURL }} style={{ // height: 200,
                width: null, flex: 1 }} />
          </Col>
          <Col style={{ flex: 4, paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}>
            <Row>
              <Col>
                <Text style={styles.listRowText} note>
                  Name
                </Text>
                <Text style={styles.listRowText}> ABC </Text>
                <Text note style={styles.listRowText}>
                  Brownie Points
                </Text>
                <Text style={styles.listRowText}>ABC</Text>
              </Col>
              <Col>
                <Text style={styles.listRowText} note>
                  Locations
                </Text>
                <Text style={styles.listRowText}>123</Text>
                <Text note />
                <Text />
              </Col>
            </Row>
            <Row>
              <Button success small>
                <Text uppercase={false}>Accept</Text>
              </Button>
              <Button small danger style={{ marginLeft: 5 }}>
                <Text uppercase={false}>Reject</Text>
              </Button>
            </Row>
          </Col>
        </Grid>
      </ListItem>;
  }

  render() {
    return <List>
          {this.renderListItem()}
          {this.renderListItem()}
      </List>;
  }
}

// const mapStateToProps = state => {
//   return state.auth;
// };
// OR better is below, equal to above
const mapStateToProps = ({ auth }) => {
  return auth;
};

export default connect(mapStateToProps)(RequestsListComponent);
