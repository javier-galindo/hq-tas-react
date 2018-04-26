import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Translate } from "react-redux-i18n";

class EditContributor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.show !== nextProps.show) {
      this.setState({ show: nextProps.show });
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    if (!this.props.contributor) {
      return null;
    }
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Translate value="edit.title" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>It works!</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Cancelar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditContributor;
