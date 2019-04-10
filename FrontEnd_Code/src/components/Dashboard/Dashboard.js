import React, { Component } from 'react';
import { Grid, Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import DailyPanel from '../DailyPanel/DailyPanel';
import GraphPanel from '../GraphPanel/GraphPanel';
import Auth from '../Auth/Auth';

// create the link in the header to sign out
const AuthButton = withRouter(
    ({ history }) =>
      Auth.isAuthenticated ? (
        <NavItem onClick={() => {
            Auth.signout(() => history.push("/"));
        }}>Logout</NavItem>
      ) : (
        <div></div>
    )
);

class Dashboard extends Component {

    // clear the timeout when this component is unmounted
    componentWillUnmount() {
        window.clearTimeout(this.timeout);
    }

  render() {

    // register a timeout to reload the page every 60 seconds
    this.timeout = window.setTimeout(() => {
        window.location.reload();
    }, 60000);

      return (
        <div>
            <Navbar inverse={true}>
                <Navbar.Header>
                    <Navbar.Brand>
                        Phone App
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight={true}>
                        <AuthButton />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Grid>
                <Row>
                    <Col md={12}>
                        <h1>Energy Efficiency Application</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <GraphPanel />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="sep"></Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <DailyPanel />
                    </Col>
                </Row>
            </Grid>
        </div>
      );
  }
}

export default Dashboard;