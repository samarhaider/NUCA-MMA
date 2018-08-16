import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
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
import styles from "../styles";
import { getPostDetail } from "../Actions";
import * as CONSTANTS from "../Constants";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import LoadingComponent from "../Components/LoadingComponent";

class PostDetailContainer extends Component {
  componentDidMount() {
    const { post } = this.props.navigation.state.params;
    this.props.dispatch(getPostDetail({ id: post.Load.id }));
  }
  renderHeader(){
    
    return <Header>
            <Button primary transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
              <Body>
                <Title>Posts Detail </Title>
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

  renderBody(){
    const post = this.props.postDetail;
    if(post.loading){
      return <LoadingComponent />
    }
    return <Content padder >
      <Card >
        <CardItem header bordered>
          <Text>Load Post Details</Text>
        </CardItem>

        <CardItem style={styles.favorDetailCardItem}>
          <Grid>
            <Row style={{ marginTop: 10 }}>
              <Col>
                <Text note>Pickup Date & Time</Text>
              </Col>
              <Col >
                <Text>{post.Load.pickup_date} {post.Load.ready_time}</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col>
                <Text note>Delivery Date & Time</Text>
              </Col>
              <Col >
                <Text>{post.Load.dropoff_date} {post.Load.close_time}</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col>
                <Text note>Origin</Text>
              </Col>
              <Col >
                <Text>{post.Load.origion_city} {post.Load.origion_state}</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col>
                <Text note>Destination</Text>
              </Col>
              <Col >
                <Text>{post.Load.destination_city} {post.Load.destination_state}</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col>
                <Text note>Weight</Text>
              </Col>
              <Col >
                <Text>{post.Load.weight} lbs</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col>
                <Text note>Load Type</Text>
              </Col>
              <Col >
                <Text>{post.LoadType.load}</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col>
                <Text note>Truck Type</Text>
              </Col>
              <Col >
                <Text>{post.TruckType.type}</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col>
                <Text note>Posted</Text>
              </Col>
              <Col >
                <Text>{post.Load.created}</Text>
              </Col>
            </Row>
          </Grid>
        </CardItem>
      </Card>
      <Card>
        <CardItem header bordered>
          <Text>Load Pieces Details</Text>
        </CardItem>
        <CardItem>
          <Grid>
            <Row style={{ marginTop: 10 }}>
              <Col>
                <Text>Total Pieces</Text>
              </Col>
              <Col >
                <Text>Height</Text>
              </Col>
              <Col >
                <Text>Length</Text>
              </Col>
              <Col >
                <Text>Width</Text>
              </Col>
            </Row>
            <List dataArray={post.LoadPiece}
                  renderRow={(loadPiece) => this.renderLoadPieceItem(loadPiece)} />
          </Grid>
        </CardItem>
      </Card>
    </Content>
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

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          {this.renderHeader()}
          {this.renderBody()}          
          <Footer>
            <FooterTab>{this.renderSubmitButton()}</FooterTab>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

// const mapStateToProps = state => {
//   return state.postDetail;
// };
// OR better is below, equal to above
const mapStateToProps = ({ postDetail, auth }) => {
  return { postDetail, auth };
};

export default connect(mapStateToProps)(PostDetailContainer);
