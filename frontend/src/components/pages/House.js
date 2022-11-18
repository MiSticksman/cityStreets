import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import HouseList from "../house/HouseList";
import NewHouseModal from "../house/NewHouseModal";

import axios from "axios";

import { API_URL_HOUSES } from "../../constants";

class House extends Component {
  state = {
    houses: []
  };

  componentDidMount() {
    this.resetState();
  }

  getHouses = () => {
    axios.get(API_URL_HOUSES).then(res => this.setState({ houses: res.data }));
  };

  resetState = () => {
    this.getHouses();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <HouseList
              houses={this.state.houses}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewHouseModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default House;
