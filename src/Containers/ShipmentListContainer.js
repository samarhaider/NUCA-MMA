import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import {
  Content,
  Grid,
  Row,
  Col,
  Button,
  Text,
  Icon,
  Item,
  Input,
  Header,
  Left,
  Right,
  List,
  ListItem,
  Body,
  Title,
  Root,
  Spinner,
  StyleProvider,
  View,
} from "native-base";
import {
  getShipments,
} from "../Actions";
import * as CONSTANTS from '../Constants';
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import styles from "../styles";
import NoRecordFoundComponent from "../Components/NoRecordFoundComponent";
import LoadingComponent from "../Components/LoadingComponent";

class ShipmentListContainer extends Component {

  getShipmentsList(params = {}) {
    let seachQuery = {
      // this.state.type
    };
    this.props.dispatch(getShipments(seachQuery));
  }

  componentDidMount(){
    this.getShipmentsList();
  }

  onItemButtonPress(shipment) {
    this.props.navigation.navigate("shipmentDetail", { shipment });
  }
  onMapButtonPress(shipment){
    this.props.navigation.navigate("shipmentMap", { shipment });
  }

  renderHeader() {
    return <Header searchBar rounded >
        <Left>
          <Button primary transparent onPress={() => this.props.navigation.navigate("DrawerToggle")} style1={{marginRight:10}}>
            <SimpleLineIcons name="list" size={25} color={commonColor.brandPrimary} />
          </Button>
        </Left>
        <Body>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
        </Body>
        <Right>
          <Button primary transparent>
            <Text>Search</Text>
          </Button>
        </Right>
      </Header>;
  }


  renderListItem(shipment) {
    return <ListItem style={{marginVertical:5,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }}
         } >
        <Grid>
          <Col style={styles.listRow}>
            <Text note style={styles.listRowText}>Order #</Text>
            <Text style={styles.listRowText}>{shipment.Load.id} </Text>
            
            <Text note style={styles.listRowText}>Pickup Date</Text>
            <Text style={styles.listRowText}>{shipment.Load.pickup_date_format}</Text>

            <Text note style={styles.listRowText}>Origin</Text>
            <Text style={styles.listRowText}>{shipment.Load.origion_city} {shipment.Load.origion_state}</Text>

            <Text note style={styles.listRowText}>Load Type</Text>
            <Text style={styles.listRowText}>{shipment.LoadType.load}</Text>
            
            <Text note style={styles.listRowText}>Weight (lbs)</Text>
            <Text style={styles.listRowText}>{shipment.Load.weight}</Text>

          </Col>
          <Col style={styles.listRow}>
            <Text note style={styles.listRowText}>Order Status</Text>
            <Text style={styles.listRowText}>{shipment.OrderAssignment.order_status}</Text>

            <Text note style={styles.listRowText}>Dropoff Date</Text>
            <Text style={styles.listRowText}>{shipment.Load.dropoff_date_format}</Text>

            <Text note style={styles.listRowText}>Destination</Text>
            <Text style={styles.listRowText}>{shipment.Load.destination_city} {shipment.Load.destination_state}</Text>

            <Text note style={styles.listRowText}>Truck Type</Text>
            <Text style={styles.listRowText}>{shipment.TruckType.type}</Text>

            <Button onPress={()=> this.onMapButtonPress.bind(this)(shipment)} transparent ><Text> View Map</Text></Button>
            <Button onPress={()=> this.onItemButtonPress.bind(this)(shipment)} transparent ><Text> View Detail</Text></Button>

          </Col>
        </Grid>
      </ListItem>;
  }

  renderList() {
    const { shipmentList } = this.props;
    if(shipmentList.loading){
      return <LoadingComponent />
    }
    if(shipmentList.data.length == 0) {
      return  <NoRecordFoundComponent />
    }
    return <List dataArray={shipmentList.data}
                 renderRow={(shipment) => this.renderListItem(shipment)}
 >
      </List>;
  }


  render() {
    return <StyleProvider style={getTheme(commonColor)}>
        <Root>
            {this.renderHeader()}
            <Content style={{backgroundColor:'white'}}>
              {this.renderList()}
            </Content>
        </Root>
      </StyleProvider>;
  }
}

// const mapStateToProps = state => {
//   return state.shipmentList;
// };
// OR better is below, equal to above
const mapStateToProps = ({ shipmentList, auth }) => {
  return { shipmentList, auth };
};

export default connect(mapStateToProps)(ShipmentListContainer);
