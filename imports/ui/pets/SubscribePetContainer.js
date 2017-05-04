import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import {SubscribePet} from './SubscribePet';
import Loading from '../components/Loading.js';
import Pets from '../../api/pets/pets';

const composer = ({ params }, onData) => {

  if(params.id){
    // ensure that pets are owned by the current user.
    const subscription = Meteor.subscribe('userData');
    if(subscription.ready()) {
      if(!Meteor.user().pets_id){
        onData(null, {pets:null});
      } else {
        const subscription = Meteor.subscribe('userPets', Meteor.user().pets_id);
        if (subscription.ready()) {
          // Here it's a find one !! not a cursor
          const pet = Pets.findOne({_id:params.id});
          console.log(pet);
          onData(null, {pet:pet});
        }
      }
    }
  } else{
    // not useful, we should call straight the COMPONENT without the container
    let currentUser = Meteor.user();
    if(currentUser){
      onData(null, {currentUser});
    }
  }

};

export default EditPetContainer = composeWithTracker(composer, Loading)(SubscribePet);
