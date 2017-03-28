import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import {EditProfil} from './EditProfil';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {


  let currentUser = Meteor.user();
  if(currentUser){
    console.log(currentUser);
    onData(null, {currentUser});
  }


};

export default EditProfilContainer = composeWithTracker(composer, Loading)(EditProfil);
