import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import StreetList from "./StreetList";
import NewStreetModal from "./NewStreetModal";

import axios from "axios";

import { API_URL_STREETS } from "../constants";

class Home extends Component {
  state = {
    streets: []
  };

  componentDidMount() {
    this.resetState();
  }

  getStreets = () => {
    axios.get(API_URL_STREETS).then(res => this.setState({ streets: res.data }));
  };

  resetState = () => {
    this.getStreets();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <StreetList
              streets={this.state.streets}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewStreetModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
