import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import RouteList from "../route/RouteList";
import NewRouteModal from "../route/NewRouteModal";

import axios from "axios";

import { API_URL_ROUTES } from "../../constants";

class MyRoute extends Component {
  state = {
    routes: []
  };

  componentDidMount() {
    this.resetState();
  }

  getRoutes = () => {
    axios.get(API_URL_ROUTES).then(res => this.setState({routes: res.data }));
  };

  resetState = () => {
    this.getRoutes();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <RouteList
              routes={this.state.routes}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewRouteModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MyRoute;
