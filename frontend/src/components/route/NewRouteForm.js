import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL_ROUTES } from "../../constants";

class NewRouteForm extends React.Component {
  state = {
    route_id: "",
    route_name: ""
  };

  componentDidMount() {
    if (this.props.route) {
      const { route_id, route_name } = this.props.route;
      this.setState({ route_id, route_name });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createRoute = e => {
    e.preventDefault();
    axios.post(API_URL_ROUTES, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editRoute = e => {
    e.preventDefault();
    axios.put(API_URL_ROUTES + this.state.route_id + '/', this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.route ? this.editRoute : this.createRoute}>
        <FormGroup>
          <Label for="route_name">Route:</Label>
          <Input
            type="text"
            name="route_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.route_name)}
          />
        </FormGroup>        
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewRouteForm;
