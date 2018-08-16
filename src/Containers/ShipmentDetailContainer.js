import React, { Component } from "react";
import { connect } from "react-redux";
import { Dimensions } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  H3,
  List,
  Button,
  Icon,
  Grid,
  Col,
  Row,
  Footer,
  FooterTab,
  StyleProvider,
  View
} from "native-base";
import { MapView } from 'expo';
import styles from "../styles";
import { getShipmentDetail } from "../Actions";
import * as CONSTANTS from "../Constants";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import LoadingComponent from "../Components/LoadingComponent";

class ShipmentDetailContainer extends Component {
  componentDidMount() {
    const { shipment } = this.props.navigation.state.params;
    this.props.dispatch(getShipmentDetail({ id: shipment.Load.id }));
  }

  renderHeader(){
    const { shipment } = this.props.navigation.state.params;
    return <Header>
            <Button primary transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
              <Body>
                <Title>Order # {shipment.Load.id} </Title>
              </Body>
              <Button primary transparent>
                <FontAwesome name="edit" size={25} color={commonColor.brandPrimary} />
              </Button>
            </Header>
  }

  renderSubmitButton() {
    const { auth } = this.props;
        return <Button info full>
            <Text uppercase={false} style={styles.authFooterText}>
              Pay Here
            </Text>
          </Button>;
  }

  renderLoadPieceItem(location, i) {
    return <Row style={{ marginTop: 10 }}>
              <Col>
                <Text>{`${i}`}</Text>
              </Col>
              <Col >
                <Text>{location.LocationHistory.locationdatetime}</Text>
              </Col>
              <Col >
                <Text>{location.LocationHistory.city} {location.LocationHistory.state}</Text>
              </Col>
          </Row>

  }

  renderBody(){
    const {loading, timezone, MacroEvents, macrodetails, locationhistory, PickupArr, PickupDep, DropoffArr, DropoffDep} = this.props.shipmentDetail;
    if(loading){
      return <LoadingComponent />
    }
    // console.tron.log(this.props.shipmentDetail)
    // alert(loading)
    // return <LoadingComponent />
    return <Content padder >
    <Card >
      <CardItem style={styles.favorDetailCardItem}>
        <Grid>
          <Row style={{ marginTop: 10 }}>
            <Col>
              <Text note>Order Status</Text>
            </Col>
            <Col >
              <Text note>Most Recent Update</Text>
            </Col>
            <Col >
              <Text note>Recent Location</Text>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col>
              <Text>{ macrodetails.Load.mplite_message || 'N/A'}</Text>
            </Col>
            <Col >
              <Text>{macrodetails.Load.mplite_location_time}</Text>
            </Col>
            <Col >
            <Text>{ macrodetails.Load.mplite_location || 'N/A'}</Text>
            </Col>
          </Row>
        </Grid>
      </CardItem>
    </Card>
    <Card >
      <CardItem style={styles.favorDetailCardItem}>
        <Grid>
          <Row style={{ marginTop: 10 }}>
            <Col>
              <Text note>Trip Sheet Stop	</Text>
            </Col>
            <Col >
              <Text note>Events</Text>
            </Col>
            <Col >
              <Text note>Status</Text>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col>
              <Text>{ macrodetails.Load.from_company}</Text>
              <Text>{ macrodetails.Load.from_address1} {macrodetails.Load.from_address2}</Text>
              <Text>{macrodetails.Load.origion_city} {macrodetails.Load.origion_state} {macrodetails.Load.from_zipcode}</Text>
            </Col>
            <Col >
              <Row>
                <Text>Arrived</Text>
                </Row>
                <Row>
                <Text>Departed</Text>
              </Row>
              <Row>
                <Text>Arrived</Text>
                </Row>
                <Row>
                <Text>Departed</Text>
              </Row>
            </Col>
            <Col >
              <Row>
                <Text>{PickupArr} - Reported By Driver</Text>
              </Row>
              <Row>
                <Text>{PickupDep} - Reported By Driver</Text>
              </Row>
              <Row>
                <Text>{DropoffArr} - Reported By Driver</Text>
              </Row>
              <Row>
                <Text>{DropoffDep}  - Reported By Driver</Text>
              </Row>
            </Col>
          </Row>
        </Grid>
      </CardItem>
    </Card>
    <Card>
      <CardItem>
        <Grid>
          <Row style={{ marginTop: 10 }}>
            <Col>
              <Text note>Location Number</Text>
            </Col>
            <Col >
              <Text note>Location Date (times in CT)</Text>
            </Col>
            <Col >
              <Text note>Location</Text>
            </Col>
          </Row>
          <List dataArray={locationhistory}
                renderRow={(location, i) => this.renderLoadPieceItem(location, i)} />
        </Grid>
      </CardItem>
    </Card>
  </Content>

  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          {this.renderHeader()}
          {this.renderBody()}
          {/* <Footer>
            <FooterTab>{this.renderSubmitButton()}</FooterTab>
          </Footer> */}
        </Container>
      </StyleProvider>
    );
  }
}

// const mapStateToProps = state => {
//   return state.shipmentDetail;
// };
// OR better is below, equal to above
const mapStateToProps = ({ shipmentDetail, auth }) => {
  return { shipmentDetail, auth };
};

export default connect(mapStateToProps)(ShipmentDetailContainer);
