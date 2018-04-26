import React from "react";
import { Button, Modal, FormControl, FormGroup, ControlLabel, Row, Col } from "react-bootstrap";
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
    if (!this.props.contributor || !this.props.contributor.contributor) {
      return null;
    }
    if (!this.props.contributors.site) {
      return null;
    }

    const floors = this.props.contributors.site.buildings[0].floors;
    const contributor = this.props.contributor.contributor;
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Translate value="edit.title" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Nombre</label>
            <h4>{`${contributor.first_name} ${contributor.last_name}`}</h4>
            <label>Nº empleado</label>
            <h4>{contributor.code}</h4>
            <label>Agencia</label>
            <h4>{contributor.business_unit}</h4>
            <form>
              <Row>
                <Col md={4}>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Select</ControlLabel>
                    <FormControl componentClass="select" placeholder="select">
                      <option value="select">select</option>
                      <option value="other">...</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Select</ControlLabel>
                    <FormControl componentClass="select" placeholder="select">
                      <option value="select">select</option>
                      <option value="other">...</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Select</ControlLabel>
                    <FormControl componentClass="select" placeholder="select">
                      <option value="select">select</option>
                      <option value="other">...</option>
                    </FormControl>
                  </FormGroup>
                </Col>
              </Row>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Cancelar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditContributor;
