import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL_STREETS } from "../constants";

class NewStreetForm extends React.Component {
  state = {
    street_id: "",
    street_name: ""
  };

  componentDidMount() {
    if (this.props.street) {
      const { street_id, street_name } = this.props.street;
      this.setState({ street_id, street_name });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createStreet = e => {
    e.preventDefault();
    axios.post(API_URL_STREETS, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editStreet = e => {
    e.preventDefault();
    axios.put(API_URL_STREETS + this.state.street_id + '/', this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.street ? this.editStreet : this.createStreet}>
        <FormGroup>
          <Label for="street_name">Street:</Label>
          <Input
            type="text"
            name="street_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.street_name)}
          />
        </FormGroup>        
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewStreetForm;
