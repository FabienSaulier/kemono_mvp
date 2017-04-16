import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import {EditProfil} from './EditProfil';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  let currentUser = Meteor.user();

  // subscribe images

  if(currentUser){
    onData(null, {currentUser});
  }
};

/*
const imageComposer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('images');
  if(subscription.ready()) {
    const imgs = Images.find().fetch();//ss
    console.log(imgs);
    onData(null, {imgs:imgs});
  }
};

const ImagesContainer = composeWithTracker(imageComposer, Loading)(EditProfil);
*/

const EditProfilContainer = composeWithTracker(composer, Loading)(EditProfil);
export default EditProfilContainer;
