/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let component;

const getUserData = () => ({
  email: document.querySelector('[name="emailAddress"]').value,
  password: document.querySelector('[name="password"]').value,
  profile: {
    firstName: document.querySelector('[name="firstName"]').value,
    lastName: document.querySelector('[name="lastName"]').value
  },
});

const signup = () => {
  const user = getUserData();

  Accounts.createUser(user, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {

      Meteor.call('sendVerificationLink',
        (error, res) => {
          if (error) {
            console.log(error);
          } else {
            console.log("call with success");
            console.log(res);

          }
        });

      browserHistory.push('/');
      Bert.alert('Bienvenue!', 'success');
    }
  });
};

const validate = () => {
  $(component.signupForm).validate({
    rules: {
      firstName: {
        required: true,
      },
      lastName: {
        required: true,
      },
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 8,
      },
    },
    messages: {
      firstName: {
        required: 'Prénom?',
      },
      lastName: {
        required: 'Nom??',
      },
      emailAddress: {
        required: 'Une adresse mail est nécessaire.',
        email: 'Cette adresse mail est-elle valide?',
      },
      password: {
        required: 'Un mot de passe est nécessaire.',
        minlength: 'Utiliser au moins 8 caractères, svp.',
      },
    },
    submitHandler() { signup(); },
  });
};

export default function handleSignup(options) {
  component = options.component;
  validate();
}
