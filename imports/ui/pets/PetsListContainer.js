import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import {PetsList} from './PetsList';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {

  if(Meteor.user()){
    const subscription = Meteor.subscribe('userPets', Meteor.user().pets_id);
    if (subscription.ready()) {
      console.log()
      // Pets.find
      onData(null, "toto" );
    }
  }


};

export default PetsListContainer = composeWithTracker(composer, Loading)(PetsList);
