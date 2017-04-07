import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, Panel } from 'react-bootstrap';
import handleSignup from '../../modules/signup';

export default class Signup extends React.Component {
  componentDidMount() {
    handleSignup({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Signup">
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 4 }>
            <Panel header="Inscription">
              <form
                ref={ form => (this.signupForm = form) }
                onSubmit={ this.handleSubmit }
              >
                <Row>
                  <Col xs={ 6 } sm={ 6 }>
                    <FormGroup>
                      <ControlLabel>Prénom</ControlLabel>
                      <FormControl
                        type="text"
                        ref="firstName"
                        name="firstName"
                        placeholder="Prénom"
                        className="shadowed-input"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={ 6 } sm={ 6 }>
                    <FormGroup>
                      <ControlLabel>Nom</ControlLabel>
                      <FormControl
                        type="text"
                        ref="lastName"
                        name="lastName"
                        placeholder="Nom"
                        className="shadowed-input"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    type="text"
                    ref="emailAddress"
                    name="emailAddress"
                    placeholder="Email"
                    className="shadowed-input"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Mot de passe</ControlLabel>
                  <FormControl
                    type="password"
                    ref="password"
                    name="password"
                    placeholder="Mot de passe"
                    className="shadowed-input"
                  />
                </FormGroup>
                <Button type="submit" bsStyle="success">Inscription</Button>
              </form>
              <p style={{marginTop:'15px'}}>Vous avez déjà un compte? <Link to="/login">Connexion</Link>.</p>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}
