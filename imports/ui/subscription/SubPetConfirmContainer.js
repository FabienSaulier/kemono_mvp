import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import {SubPetConfirm} from './SubPetConfirm';
import Loading from '../components/Loading.js';
import Pets from '../../api/pets/pets';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('userData');
  if(subscription.ready()) {
    if(!Meteor.user().pets_id){
      onData(null, {pets:null});
    } else {
      const subscription = Meteor.subscribe('userPets', Meteor.user().pets_id);
      if (subscription.ready()) {
        const petsCursor = Pets.find({_id:{$in:Meteor.user().pets_id}});
        const pets = petsCursor.fetch();
        console.log(pets);
        onData(null, {pets:pets});
      }
    }
  }
};

export default SubPetConfirmContainer = composeWithTracker(composer, Loading)(SubPetConfirm);
