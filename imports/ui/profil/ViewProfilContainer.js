import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import {ViewProfil} from './ViewProfil';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('userData');
  if (subscription.ready()) {
    onData(null, Meteor.user() );
  }
};

export default ViewProfilContainer = composeWithTracker(composer, Loading)(ViewProfil);
