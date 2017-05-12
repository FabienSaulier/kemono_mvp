import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

Meteor.users.helpers({

  isProfilValid(){

    // est ce que KYC validé ?

    return true;
  }

});
