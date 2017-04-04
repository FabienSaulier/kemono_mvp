import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import AuthenticatedNavigation from './AuthenticatedNavigation.js';
import Loading from '../components/Loading.js';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('userData');
  if (subscription.ready()) {
    onData(null, { user: Meteor.user() });
  }
}

export default AuthenticatedNavigationContainer = composeWithTracker(composer, Loading)(AuthenticatedNavigation);
