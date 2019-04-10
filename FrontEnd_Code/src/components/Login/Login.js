import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import Auth from '../Auth/Auth';

class Login extends Component {
    constructor() {
        super();

        // bind our methods to the component
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);

        // default state values
        this.state = {
            redirectToReferrer: false,
            username: null,
            password: null
        };
    }
  
    // when the button is clicked, we will cawll out auth service to authenticate the credentials,
    // currently i am not handeling errors in authentication such as wrong username or password
    onClick = () => {
        const self = this;

        // authentication service returns a promise
        Auth.authenticate({
            username: this.state.username,
            password: this.state.password
        })
            // handle success
            .then((response) => {
                Auth.setSession(response);
                self.setState({ redirectToReferrer: true });
            })
            // handle errors
            .catch((error) => {
            });
    }

    // when the values in our input changes, we will store the values in state
    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        // create a local variable for state
        let { redirectToReferrer } = this.state;

        // redirect to the dashboard if authentication was successful
        if (redirectToReferrer) {
            return <Redirect to="/dashboard" />;
        }

        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <h1>Login</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <ControlLabel htmlFor="username">Username</ControlLabel>
                            <FormControl id="username" name="username" type="text" onChange={ this.onChange } />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel htmlFor="password">Password</ControlLabel>
                            <FormControl id="password" name="password" type="password" onChange={ this.onChange } />
                        </FormGroup>
                        <FormGroup>
                            <Button type="button" className="btn btn-primary" onClick={ this.onClick }>Sign in!</Button>
                        </FormGroup>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Login;
