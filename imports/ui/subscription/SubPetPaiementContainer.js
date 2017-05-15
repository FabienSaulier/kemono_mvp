import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import {SubPetPaiement} from './SubPetPaiement';
import Loading from '../components/Loading.js';
import Pets from '../../api/pets/pets';

const composer = ({ params }, onData) => {

  const subscription = Meteor.subscribe('pets');
  if (subscription.ready()) {
    // Here it's a find one !! not a cursor
    const pet = Pets.findOne({_id:params.id});
    console.log(pet);
    onData(null, {pet:pet});
  }


  /*
  if(subscription.ready()) {
    onData(null, null);

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
  */
};



export default SubPetPaiementContainer = composeWithTracker(composer, Loading)(SubPetPaiement);
