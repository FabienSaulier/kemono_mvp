/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let component;
let token;

const handleReset = () => {
  const password = document.querySelector('[name="newPassword"]').value;
  Accounts.resetPassword(token, password, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Mot de passe réinitialisé!', 'success');
    }
  });
};

const validate = () => {
  $(component.resetPasswordForm).validate({
    rules: {
      newPassword: {
        required: true,
        minlength: 8,
      },
      repeatNewPassword: {
        required: true,
        minlength: 8,
        equalTo: '[name="newPassword"]',
      },
    },
    messages: {
      newPassword: {
        required: 'Entrer un nouveau mot de passe, svp.',
        minlength: 'Utiliser au moins 6 caractères, svp.',
      },
      repeatNewPassword: {
        required: 'Répéter votre nouveau mot de passe, svp.',
        equalTo: 'Ummh, vos mots de passe ne correspondent pas.',
      },
    },
    submitHandler() { handleReset(); },
  });
};

export default function handleResetPassword(options) {
  component = options.component;
  token = options.token;
  validate();
}
