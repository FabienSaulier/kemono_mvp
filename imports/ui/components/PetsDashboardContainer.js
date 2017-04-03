import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import PetsDashboardComponent from './PetsDashboardComponent';
import Loading from '../components/Loading.js';

import Pets from '../../api/pets/pets';

const composer = ({ params }, onData) => {

  const subscription = Meteor.subscribe('userData');

  if (subscription.ready()) {

    if(!Meteor.user().pets_id){
      onData(null, {pets:{}});

    } else {
      const subscription = Meteor.subscribe('userPets', Meteor.user().pets_id);
      if (subscription.ready()) {
        const petsCursor = Pets.find({_id:{$in:Meteor.user().pets_id}});
        const pets = petsCursor.fetch();
        onData(null, {pets:pets});
      }
    }
  }
};

export default PetsDashboardContainer = composeWithTracker(composer, Loading)(PetsDashboardComponent);
