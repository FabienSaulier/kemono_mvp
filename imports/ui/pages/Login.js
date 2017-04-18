import React from 'react';
import { Link } from 'react-router';
import {Form, Row, Col, FormGroup, ControlLabel, FormControl, Button, Panel } from 'react-bootstrap';
import handleLogin from '../../modules/login';

export default class Login extends React.Component {
  componentDidMount() {
    handleLogin({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 4 }>
            <Panel header="Connexion" >
            <form ref={ form => (this.loginForm = form) } className="login" onSubmit={ this.handleSubmit }>
              <FormGroup>
                <ControlLabel>E-mail</ControlLabel>
                <FormControl className="ttt" type="email" ref="emailAddress" name="emailAddress" placeholder="Adresse e-mail"/>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  <span className="pull-left">Mot de passe&nbsp;&nbsp;&nbsp;</span>
                  <Link className="pull-right" to="/recover-password">Mot de passe oublié?</Link>
                </ControlLabel>
                <FormControl type="password" ref="password" name="password" placeholder="Mot de passe"/>
              </FormGroup>
              <Button type="submit" className="dark" bsStyle="success">Connexion</Button>
            </form>
            <p style={{marginTop:'15px'}}>Vous n'avez pas de compte? <Link to="/signup">Inscription</Link>.</p>
          </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}
