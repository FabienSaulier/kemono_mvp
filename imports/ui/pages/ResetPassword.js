import React from 'react';
import { Row, Col, Alert, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleResetPassword from '../../modules/reset-password';

export default class ResetPassword extends React.Component {
  componentDidMount() {
    handleResetPassword({ component: this, token: this.props.params.token });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="ResetPassword">
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 4 }>
            <h4 className="page-header">Réinitialisation du mot de passe</h4>
            <Alert bsStyle="info">
              Pour réinitialiser votre mot de passe, entrez un nouveau ci-dessous. Vous serez connecté
     Avec votre nouveau mot de passe.
            </Alert>
            <form
              ref={ form => (this.resetPasswordForm = form) }
              className="reset-password"
              onSubmit={ this.handleSubmit }
            >
              <FormGroup>
                <ControlLabel>Nouveau mot de passe</ControlLabel>
                <FormControl
                  type="password"
                  ref="newPassword"
                  name="newPassword"
                  placeholder="Nouveau mot de passe"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Répéter le nouveau mot de passe</ControlLabel>
                <FormControl
                  type="password"
                  ref="repeatNewPassword"
                  name="repeatNewPassword"
                  placeholder="Répéter le nouveau mot de passe"
                />
              </FormGroup>
              <Button type="submit" bsStyle="success">Réinitialiser le mot de passe &amp; Connexion</Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  params: React.PropTypes.object,
};
