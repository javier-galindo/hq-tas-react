import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { Translate } from "react-redux-i18n";
import { connect } from "react-redux";

import EditContributorForm from "./EditContributorForm";

export class EditContributor extends Component {
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
          <EditContributorForm />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Cancelar</Button>
          <Button onClick={this.handleClose} bsStyle="danger">
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditContributor;
