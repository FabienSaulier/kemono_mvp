import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import AppNavigation from '../components/AppNavigation.js';
import Loading from '../components/Loading.js';

const composer = (props, onData) => {

  const subscription = Meteor.subscribe('userData');

onData(null, { hasUser: Meteor.user() });
/*
  if (subscription.ready()) {

    onData(null, { hasUser: Meteor.user() });

  }*/

//  onData(null, { hasUser: Meteor.user() });
}


export default AppNavigationContainer = composeWithTracker(composer, Loading)(AppNavigation);