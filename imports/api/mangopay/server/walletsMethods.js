import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../../modules/rate-limit.js';

import {MangoPayApi} from './mangoPayApi';


const createKemoWallet = new ValidatedMethod({
  name: 'createKemoWallet',
  validate: null,
  run() {
    console.log("createKemoWallet");
    const wallet = new MangoPayApi.Wallets.create({
      "Tag": "custom meta",
  //    "Owners": [ "8494514" ],Meteor.user().profile.mangoPayId
      "Currency": "EUR"
    });
    MangoPayApi.Users.create(myUser,  function(error, result) {
      if(error){
        console.log(error);
        console.log(result);
      }
      else {
          console.log(result);
      }

    });
  }
});
