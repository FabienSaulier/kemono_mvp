import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Jumbotron } from 'react-bootstrap';
import { Segment, Label} from 'semantic-ui-react'

import PetsDashboardComponent from '../components/PetsDashboardComponent'

export const Index = ({user}) => (

  Meteor.userId() ?
   (
  <div className="Index">
    <Segment padded='very' raised>
      <Label attached='top left' style={{'fontSize':'14px'}}>En cours</Label>
      Le coût des soins vétérinaires peut être très élevé.
      Découvrez comment Kemono aide les propriétaires à faire face ensemble,
      pour le bien-être de leurs compagnons ! Intégrez le réseau de partenaires Kemono pour accroître votre patientèle et votre visibilité sur Internet.
      Pellentesque habitant morbi tristique senectus.
    </Segment>
    <Segment padded='very' raised>
      <Label attached='top left' style={{'fontSize':'14px'}}>Mes compagnons</Label>
      <PetsDashboardComponent user={user}/>
    </Segment>
    <Segment padded='very'>
      <Label attached='top left' style={{'fontSize':'14px'}}>Les campagnes en cours sur Kemono</Label>
      Pellentesque habitant morbi tristique senectus.
    </Segment>
  </div>
) : (

  <Jumbotron className="text-center">
    <h2>Acceuil Kemono </h2>
    <p>utilisateur non loggé</p>
  </Jumbotron>

)
);
