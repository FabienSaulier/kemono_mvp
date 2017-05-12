import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Loading from '../components/Loading.js';
import {Account} from '../pages/Account.js';

const composer = (params, onData) => {
    Meteor.call('getUserTransactionsList', (err, res) => {
      if(err) {
        console.log('error '+err);
      } else {
        onData(null, {transactionsList:res});
      }
    });
};

export default composeWithTracker(composer)(Account);
