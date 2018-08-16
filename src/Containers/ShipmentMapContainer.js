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

class ShipmentMapContainer extends Component {
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

  renderLoadPieceItem(loadPiece) {
    return <Row style={{ marginTop: 10 }}>
              <Col>
                <Text>{loadPiece.total_pieces}</Text>
              </Col>
              <Col >
                <Text>{loadPiece.height}</Text>
              </Col>
              <Col >
                <Text>{loadPiece.length}</Text>
              </Col>
              <Col >
                <Text>{loadPiece.width}</Text>
              </Col>
          </Row>

  }
  renderMap(){
    const {loading, locationhistory} = this.props.shipmentDetail;
    const { width, height } = Dimensions.get('window');
    if(loading) {
      return <LoadingComponent />
    }
    return <View style={{ width, height }}>
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: parseFloat(locationhistory[0].LocationHistory.latitude),
              longitude: parseFloat(locationhistory[0].LocationHistory.longitude),
              latitudeDelta: 50,
              longitudeDelta: 25,
            }} >
        {locationhistory.map((marker, i) => (
              <MapView.Marker
                key={i}
                coordinate={{longitude: parseFloat(marker.LocationHistory.longitude), latitude: parseFloat(marker.LocationHistory.latitude)} }
                title={`${i}`}
                description={`${marker.LocationHistory.street1} ${marker.LocationHistory.city} ${marker.LocationHistory.state}`}
              />
            ))}
          </MapView>
        </View>;

  }
  render() {
    const {timezone, MacroEvents, macrodetails, locationhistory} = this.props.shipmentDetail;
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          {this.renderHeader()}
          <Content scrollEnabled={false} >
          {this.renderMap()}
          </Content>
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

export default connect(mapStateToProps)(ShipmentMapContainer);
