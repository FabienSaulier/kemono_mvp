import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Jumbotron , Panel} from 'react-bootstrap';

import PetsDashboardContainer from '../components/PetsDashboardContainer'
import CampaignsDashboardComponent from '../components/CampaignsDashboardComponent'
import OngoingDashboardComponent from '../components/OngoingDashboardComponent'

export const Index = (props) => (
  Meteor.userId() ?
   (
  <div className="Index">
    <Panel header='En cours' bsStyle="warning" >
      <OngoingDashboardComponent user={props.currentUser} />
    </Panel>
    <Panel header='Mes compagnons' bsStyle="warning">
      <PetsDashboardContainer/>
    </Panel>
    <Panel header='Les campagnes en cours sur Kemono' bsStyle="warning">
      <CampaignsDashboardComponent />
    </Panel>
  </div>
) : (

  <Jumbotron className="text-center">
    <h2>Acceuil Kemono </h2>
    <p>utilisateur non loggé</p>
  </Jumbotron>

)
);
