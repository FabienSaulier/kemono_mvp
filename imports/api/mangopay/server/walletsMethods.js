import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../../modules/rate-limit.js';

import {MangoPayApi} from './mangoPayApi';


const createKemoWallet = new ValidatedMethod({
  name: 'createKemoWallet',
  validate: null,
  run() {
    console.log("createKemoWallet");
    const wallet = new MangoPayApi.models.Wallet({
      "Tag": "custom meta",
      "Owners":[Meteor.user().mangop.user_id],
      "Description": "user personal wallet",
      "Currency": "EUR"
    });
    MangoPayApi.Wallets.create(wallet,  Meteor.bindEnvironment(function(response) {
      if(response.errors){
        console.log("print error: ");
        console.log(response.errors);
      }else{
        let mpWalleterId = {mpWalleterId:response.Id};
        let res =   Meteor.call("updateMangoPUserWalletId", mpWalleterId);
        console.log(res);
      }
    }));
  }
});
