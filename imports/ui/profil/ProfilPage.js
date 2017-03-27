import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Jumbotron } from 'react-bootstrap';

import ViewProfilContainer from './ViewProfilContainer';

const ProfilPage = () => (
  <div className="Index">
    <Jumbotron className="text-center">
      <h2>Profil Page</h2>


    </Jumbotron>
    <ViewProfilContainer />
  </div>
);

export default ProfilPage;
