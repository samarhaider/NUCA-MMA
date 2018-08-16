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
  getPosts,
} from "../Actions";
import * as CONSTANTS from '../Constants';
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import styles from "../styles";
import NoRecordFoundComponent from "../Components/NoRecordFoundComponent";
import LoadingComponent from "../Components/LoadingComponent";
var BUTTONS = ["Pick/Drop", "Drive", "General", "Cancel"];
var CANCEL_INDEX = 3;

class ManagePostContainer extends Component {

  getPostsList(params = {}) {
    let seachQuery = {
      // this.state.type
    };
    this.props.dispatch(getPosts(seachQuery));
  }

  componentDidMount(){
    this.getPostsList();
  }

  onItemButtonPress(post) {
    this.props.navigation.navigate("postDetail", { post });
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


  renderListItem(post) {
    return <ListItem style={{marginVertical:5,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }}
        } onPress={()=> this.onItemButtonPress.bind(this)(post)}>
        <Grid>
          <Col style={styles.listRow}>
            <Text note style={styles.listRowText}>Order #</Text>
            <Text style={styles.listRowText}>{post.Load.id} </Text>
            
            <Text note style={styles.listRowText}>Pickup Date</Text>
            <Text style={styles.listRowText}>{post.Load.pickup_date_format}</Text>

            <Text note style={styles.listRowText}>Origin</Text>
            <Text style={styles.listRowText}>{post.Load.origion_city} {post.Load.origion_state}</Text>
            
            <Text note style={styles.listRowText}>Posted</Text>
            <Text style={styles.listRowText}>{post.Load.created_format}</Text>

            <Text note style={styles.listRowText}>Weight (lbs)</Text>
            <Text style={styles.listRowText}>{post.Load.weight}</Text>

          </Col>
          <Col style={styles.listRow}>
            <Text note style={styles.listRowText}>Load Type</Text>
            <Text style={styles.listRowText}>{post.LoadType.load}</Text>

            <Text note style={styles.listRowText}>Dropoff Date</Text>
            <Text style={styles.listRowText}>{post.Load.dropoff_date_format}</Text>

            <Text note style={styles.listRowText}>Destination</Text>
            <Text style={styles.listRowText}>{post.Load.destination_city} {post.Load.destination_state}</Text>

            <Text note style={styles.listRowText}>Bids Received</Text>
            <Text style={styles.listRowText}>{post.Load.total_bids}</Text>

          </Col>
        </Grid>
      </ListItem>;
  }

  renderList() {
    const { postList } = this.props;
    if(postList.loading){
      return <LoadingComponent />
    }
    if(postList.data.length == 0) {
      return  <NoRecordFoundComponent />
    }
    return <List dataArray={postList.data}
                 renderRow={(post) => this.renderListItem(post)}
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
//   return state.postList;
// };
// OR better is below, equal to above
const mapStateToProps = ({ postList, auth }) => {
  return { postList, auth };
};

export default connect(mapStateToProps)(ManagePostContainer);
