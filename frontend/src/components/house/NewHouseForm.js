import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL_HOUSES } from "../../constants";

class NewHouseForm extends React.Component {
  state = {
    
    house_id: "",
    street: "", // street_id: "", street_name: "",
    house_number: "",
  };

  componentDidMount() {
    if (this.props.house) {
      const { house_id, street, house_number } = this.props.house;
      this.setState({ house_id, street, house_number });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createHouse = e => {
    e.preventDefault();
    axios.post(API_URL_HOUSES, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editHouse = e => {
    e.preventDefault();
    axios.put(API_URL_HOUSES + this.state.house_id + '/', this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.house ? this.editHouse : this.createHouse }>
        <FormGroup>
          <Label for="house_number">House:</Label>
          <Input
            type="text"
            name="house_number"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.house_number)}
          />
        </FormGroup>        
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewHouseForm;
