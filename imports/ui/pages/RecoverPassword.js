import React from 'react';
import { Row, Col, Alert, FormGroup, FormControl, Button, Panel } from 'react-bootstrap';
import handleRecoverPassword from '../../modules/recover-password';

export default class RecoverPassword extends React.Component {
  componentDidMount() {
    handleRecoverPassword({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="RecoverPassword">
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 4 }>
            <Panel header="Récupérer votre mot de passe">
              <Alert bsStyle="info">
                Entrer votre adresse mail pour recevoir un lien et choisir un nouveau mot de passe.
              </Alert>
              <form
                ref={ form => (this.recoverPasswordForm = form) }
                className="recover-password"
                onSubmit={ this.handleSubmit }
              >
                <FormGroup>
                  <FormControl
                    type="email"
                    ref="emailAddress"
                    name="emailAddress"
                    placeholder="E-mail Address"
                  />
                </FormGroup>
                <Button type="submit" bsStyle="success">Récupérer votre mot de passe</Button>
              </form>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}
