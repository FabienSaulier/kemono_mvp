/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.js';
import Documents from '../../ui/pages/Documents.js';
import NewDocument from '../../ui/pages/NewDocument.js';
import EditDocument from '../../ui/containers/EditDocument.js';
import ViewDocument from '../../ui/containers/ViewDocument.js';
import Login from '../../ui/pages/Login.js';
import NotFound from '../../ui/pages/NotFound.js';
import RecoverPassword from '../../ui/pages/RecoverPassword.js';
import ResetPassword from '../../ui/pages/ResetPassword.js';
import Signup from '../../ui/pages/Signup.js';

import IndexContainer from '../../ui/containers/IndexContainer.js';

import PetsListContainer from '../../ui/pets/PetsListContainer.js';
import EditPetContainer from '../../ui/pets/EditPetContainer.js';

import CampaignsList from '../../ui/pages/CampaignsList.js';

import ViewProfilContainer from '../../ui/profil/ViewProfilContainer.js';


import Account from '../../ui/pages/Account.js';


/*
import EditProfilContainer from '../../ui/profil/EditProfilContainer.js';

*/

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

/**
TODO: Index if authenticate = dashboard otherwise page exterieure


<Route name="editProfil" path="/profil/edit/" component={ EditProfilContainer } onEnter={ authenticate } />


**/
Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ IndexContainer } />
        <Route name="documents" path="/documents" component={ Documents } onEnter={ authenticate } />
        <Route name="newDocument" path="/documents/new" component={ NewDocument } onEnter={ authenticate } />
        <Route name="editDocument" path="/documents/:_id/edit" component={ EditDocument } onEnter={ authenticate } />
        <Route name="viewDocument" path="/documents/:_id" component={ ViewDocument } onEnter={ authenticate } />
        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />

        <Route name="pets" path="/pets" component={ PetsListContainer } onEnter={ authenticate } />
        <Route name="editPet" path="/pets/edit" component={ EditPetContainer } onEnter={ authenticate } />

        <Route name="campaignsList" path="/campaignsList" component={ CampaignsList } onEnter={ authenticate } />

        <Route name="profil" path="/profil" component={ ViewProfilContainer } onEnter={ authenticate } />

        <Route name="account" path="/account" component={ Account } onEnter={ authenticate } />

        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
