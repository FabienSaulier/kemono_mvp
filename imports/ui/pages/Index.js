import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Jumbotron , Panel} from 'react-bootstrap';

//import PetsDashboardContainer from '../components/PetsDashboardContainer'
//import CampaignsDashboardComponent from '../components/CampaignsDashboardComponent'

// <PetsDashboardContainer/>

// <CampaignsDashboardComponent />

export const Index = ({user}) => (
  Meteor.userId() ?
   (
  <div className="Index">
    <Panel header='En cours' bsStyle="warning" >
      Vous n'avez pas d'opération en cours.
    </Panel>
    <Panel header='Mes compagnons' bsStyle="warning">
      Ajouter le PetsDashboardContainer
    </Panel>
    <Panel header='Les campagnes en cours sur Kemono' bsStyle="warning">
      Ajouter le CampaignsDashboardComponent
    </Panel>
  </div>
) : (

  <Jumbotron className="text-center">
    <h2>Acceuil Kemono </h2>
    <p>utilisateur non loggé</p>
  </Jumbotron>

)
);
