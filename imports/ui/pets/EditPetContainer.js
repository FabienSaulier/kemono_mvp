import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import {EditPet} from './EditPet';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {

  let currentUser = Meteor.user();

  //TODO  ???? edit: get pet concerned
  if(currentUser){
    console.log(currentUser);
    onData(null, {currentUser});
  }


};

export default EditPetContainer = composeWithTracker(composer, Loading)(EditPet);
