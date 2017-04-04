import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import {Index} from '../pages/Index';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  let currentUser = Meteor.user();
  console.log(currentUser);
  if(currentUser){
    onData(null, {currentUser});
  }
};

export default IndexContainer = composeWithTracker(composer, Loading)(Index);
