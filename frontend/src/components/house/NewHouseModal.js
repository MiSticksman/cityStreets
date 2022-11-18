import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewHouseForm from "./NewHouseForm";

class NewHouseModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;
    var title = "Editing House";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Creating New House";
      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "150px" }}
        >
          Create New
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewHouseForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              street={this.props.street}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewHouseModal;
