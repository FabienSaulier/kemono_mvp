import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Jumbotron } from 'react-bootstrap';
import { Segment, Label} from 'semantic-ui-react'
import { Card, Icon, Image } from 'semantic-ui-react'

import PetsDashboardComponent from '../components/PetsDashboardComponent'

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


<Card.Group>
  <Card>
    <Card.Content>
      <Image floated='left' size='small' src='/img/chat1.jpg' />
      <Card.Header>
        Minou
      </Card.Header>
      <Card.Meta>
        Le chat de Delphine
      </Card.Meta>
      <Card.Description>
        Il s'est cassé la patte en sautant du balcon. J'habite au 3° étage, c'est un peu haut, aieaie, il souffre :'
      </Card.Description>
    </Card.Content>
  </Card>
  <Card>
    <Card.Content>
      <Image floated='right' size='medium' src='/img/chien1.jpg' />
      <Card.Header>
        Filou
      </Card.Header>
      <Card.Meta>
        Le chien de Max
      </Card.Meta>
      <Card.Description>
        Faut-il vraiment mettre une description?
      </Card.Description>
    </Card.Content>
  </Card>
  <Card>
    <Card.Content>
      <Image floated='right' size='small' src='/img/chien2.jpg' />
      <Card.Header>
        Jenny
      </Card.Header>
      <Card.Meta>
        Le chien de Michel
      </Card.Meta>
      <Card.Description>
        Blablablab blablab Blablabla Blablablab Blablablab Blablablab Blablablab
      </Card.Description>
    </Card.Content>
  </Card>
</Card.Group>

    </Segment>
  </div>
) : (

  <Jumbotron className="text-center">
    <h2>Acceuil Kemono </h2>
    <p>utilisateur non loggé</p>
  </Jumbotron>

)
);
