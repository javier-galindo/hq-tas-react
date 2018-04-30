import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Translate } from "react-redux-i18n";

import EditContributorForm from "./EditContributorForm";

class EditContributor extends Component {
  state = {
    show: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.show !== nextProps.show) {
      this.setState({ show: nextProps.show });
    }
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Translate value="edit.title" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditContributorForm handleClose={this.handleClose} />
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditContributor;
