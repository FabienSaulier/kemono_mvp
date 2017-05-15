import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import {SubPetPaiement} from './SubPetPaiement';
import Loading from '../components/Loading.js';
import Pets from '../../api/pets/pets';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('pets');
  if (subscription.ready()) {
    const pet = Pets.findOne({_id:params.id});
    onData(null, {pet:pet});
  }
};

export default SubPetPaiementContainer = composeWithTracker(composer, Loading)(SubPetPaiement);
