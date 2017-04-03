import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Jumbotron } from 'react-bootstrap';
import { Segment, Label, Card, Icon, Image } from 'semantic-ui-react'

import PetsDashboardComponent from '../components/PetsDashboardComponent'
import CampaignsDashboardComponent from '../components/CampaignsDashboardComponent'

export const Index = ({user}) => (

  Meteor.userId() ?
   (
  <div className="Index">
    <Segment padded='very' raised>
      <Label attached='top left' style={{'fontSize':'14px'}}>En cours</Label>
      Vous n'avez pas d'opération en cours.
    </Segment>
    <Segment padded='very' raised>
      <Label attached='top left' style={{'fontSize':'14px'}}>Mes compagnons</Label>
      <PetsDashboardComponent user={user}/>
    </Segment>
    <Segment padded='very'>
      <Label attached='top left' style={{'fontSize':'14px'}}>Les campagnes en cours sur Kemono</Label>
      <CampaignsDashboardComponent />
    </Segment>
  </div>
) : (

  <Jumbotron className="text-center">
    <h2>Acceuil Kemono </h2>
    <p>utilisateur non loggé</p>
  </Jumbotron>

)
);
