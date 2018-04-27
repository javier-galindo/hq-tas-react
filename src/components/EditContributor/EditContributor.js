import React from "react";
import { Button, Modal, FormControl, FormGroup, ControlLabel, Row, Col } from "react-bootstrap";
import { Translate, I18n } from "react-redux-i18n";
import { connect } from "react-redux";
import { getWorkrooms, getWorkplaces, cleanWorkplaces, cleanWorkrooms } from "../../actions";

class EditContributor extends React.Component {
  state = {
    show: false,
    disableWorkroom: true,
    disableWorkplace: true,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.show !== nextProps.show) {
      this.setState({ show: nextProps.show });
    }
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleFloors = (e) => {
    const floorId = e.target.value;

    if (floorId) {
      this.setState({ disableWorkroom: false });
      return this.props.dispatch(getWorkrooms(floorId));
    }

    this.setState({
      disableWorkroom: true,
      disableWorkplace: true,
    });
    this.props.dispatch(cleanWorkrooms());
    this.props.dispatch(cleanWorkplaces());
    return null;
  };

  handleWorkroom = (e) => {
    const wid = e.target.value;
    if (!wid) {
      this.setState({ disableWorkplace: true });
      this.props.dispatch(cleanWorkplaces());
      return null;
    }

    this.setState({ disableWorkplace: false });
    return this.props.dispatch(getWorkplaces(wid));
  };

  renderFloors = (floors) => {
    if (!floors) {
      return null;
    }

    return floors.map(floor => (
      <option key={floor.id} value={floor.id}>
        {floor.name}
      </option>
    ));
  };

  renderWorkrooms = workrooms =>
    workrooms.map(workroom => (
      <option key={workroom.id} value={workroom.id}>
        {workroom.name}
      </option>
    ));

  renderWorkplaces = workplaces =>
    workplaces.map(workplace => (
      <option key={workplace.id} value={workplace.id}>
        {workplace.name}
      </option>
    ));

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
            <Translate value="edit.contributorName" tag="label" />
            <h4>{`${contributor.first_name} ${contributor.last_name}`}</h4>
            <Translate value="edit.contributorCode" tag="label" />
            <h4>{contributor.code}</h4>
            <Translate value="edit.contributorBU" tag="label" />
            <h4>{contributor.business_unit}</h4>
            <br />

            <form>
              <Translate value="edit.data" dangerousHTML />
              <Row>
                <Col md={4}>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>
                      <Translate value="edit.floor" />
                    </ControlLabel>
                    <FormControl componentClass="select" onChange={this.handleFloors}>
                      <option value="">{I18n.t("edit.placeholder")}</option>
                      {this.renderFloors(floors)}
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>
                      <Translate value="edit.workroom" />
                    </ControlLabel>
                    <FormControl
                      disabled={this.state.disableWorkroom}
                      componentClass="select"
                      onChange={this.handleWorkroom}
                    >
                      <option value="">{I18n.t("edit.placeholder")}</option>
                      {this.props.workrooms.workrooms
                        ? this.renderWorkrooms(this.props.workrooms.workrooms)
                        : null}
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>
                      <Translate value="edit.workplace" />
                    </ControlLabel>
                    <FormControl
                      disabled={this.state.disableWorkplace}
                      componentClass="select"
                      placeholder="select"
                    >
                      <option value="">{I18n.t("edit.placeholder")}</option>
                      {this.props.workrooms.workplaces
                        ? this.renderWorkplaces(this.props.workrooms.workplaces)
                        : null}
                    </FormControl>
                  </FormGroup>
                </Col>
              </Row>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Cancelar</Button>
            <Button onClick={this.handleClose} bsStyle="danger">
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workrooms: state.workrooms,
  };
}

export default connect(mapStateToProps)(EditContributor);
