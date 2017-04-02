import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import {Index} from '../pages/Index';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {

  onData(null, Meteor.user());

/*
  let currentUser = Meteor.user();
  if(currentUser){
    onData(null, {currentUser});
  }
  */
};

export default IndexContainer = composeWithTracker(composer, Loading)(Index);
