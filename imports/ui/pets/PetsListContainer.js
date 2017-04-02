import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import {PetsList} from './PetsList';
import Loading from '../components/Loading.js';

import Pets from '../../api/pets/pets';

const composer = ({ params }, onData) => {

  if(Meteor.user() && Meteor.user().pets_id){
    console.log("in");
    console.log(Meteor.user().pets_id);

    const subscription = Meteor.subscribe('userPets', Meteor.user().pets_id);
    if (subscription.ready()) {
      console.log()
      // Pets.find
      const petsCursor = Pets.find({_id:{$in:Meteor.user().pets_id}});
      const pets = petsCursor.fetch();
      onData(null, pets);
    }
  }


};

export default PetsListContainer = composeWithTracker(composer, Loading)(PetsList);
