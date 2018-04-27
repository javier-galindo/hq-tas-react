import React, { Component } from "react";
import { Translate } from "react-redux-i18n";
import { Table, Grid, Col, Row } from "react-bootstrap";

import { connect } from "react-redux";

import { getContributorsUnassigned, getContributor } from "./actions";
import SiteData from "./components/siteData/siteData";
import { NavBar } from "./components/NavBar/NavBar";
import AlertDissmisable from "./components/widgets/alertDissmisable";
import EditContributor from "./components/EditContributor/EditContributor";

class App extends Component {
  state = {
    showModal: false,
  };

  componentWillMount() {
    this.props.getContributors();
  }

  checkError() {
    if (this.props.contributors.error) {
      return <AlertDissmisable />;
    }
    return null;
  }

  checkWorkroom = (contributor) => {
    if (!contributor.workroom) {
      return (
        <span className="unassigned">
          <Translate value="contributors_list.unassigned" />
        </span>
      );
    }
    return (
      <span className="overocupation">
        <Translate value="contributors_list.overoccupation" />
      </span>
    );
  };

  editContributor = (e) => {
    const contributorId = e.target.getAttribute("value");
    if (!contributorId) {
      return null;
    }
    this.props.getContributor(contributorId);

    this.setState({ showModal: true });
  };

  renderContributors = (contributors) => {
    if (!contributors) {
      return null;
    }

    if (contributors.length === 0) {
      return (
        <tr>
          <td colSpan="6">
            <Translate value="contributors_list.empty" />
          </td>
        </tr>
      );
    }

    return contributors.map(item => (
      <tr key={item.id} onClick={this.editContributor}>
        <td value={item.id}>{`${item.first_name} ${item.last_name}`}</td>
        <td value={item.id}>{item.workroom}</td>
        <td value={item.id}>{item.floor}</td>
        <td value={item.id}>{item.code}</td>
        <td value={item.id}>{item.business_unit}</td>
        <td>{this.checkWorkroom(item)}</td>
      </tr>
    ));
  };

  render() {
    return (
      <div>
        <NavBar />
        {<EditContributor show={this.state.showModal} {...this.props} />}
        <Grid fluid>
          {this.checkError()}
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <h4>
                <Translate value="contributors_list.header" />
              </h4>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>
                      <Translate value="contributors_list.contributor" />
                    </th>
                    <th>
                      <Translate value="contributors_list.workroom" />
                    </th>
                    <th>
                      <Translate value="contributors_list.floor" />
                    </th>
                    <th>
                      <Translate value="contributors_list.employee_code" />
                    </th>
                    <th>
                      <Translate value="contributors_list.bussiness_unit" />
                    </th>
                    <th className="customHeadTable">
                      <Translate value="contributors_list.state" />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>{this.renderContributors(this.props.contributors.unassigned)}</tbody>
              </Table>
            </Col>
            <Col xs={12} md={4} className="position_data">
              <SiteData />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contributors: state.contributors,
    contributor: state.contributor,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getContributors: () => {
      dispatch(getContributorsUnassigned());
    },
    getContributor: (id) => {
      dispatch(getContributor(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
