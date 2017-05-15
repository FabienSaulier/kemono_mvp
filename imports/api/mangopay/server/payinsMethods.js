import { Meteor } from 'meteor/meteor';
import { EJSON } from 'meteor/ejson';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../../modules/rate-limit.js';
import {MangoPayApi} from './mangoPayApi';

import Future from 'fibers/future';


const paiementToKemonoWallet = new ValidatedMethod({
  name: 'paiementToKemonoWallet',
  validate:  new SimpleSchema({
    sub: { type: String, allowedValues:['basic', 'premium']},
    ok_monthly: { type: Boolean, allowedValues:[true]},
    ok_refound: { type: Boolean, allowedValues:[true]},
    pet_id:{type:String}
  }).validator(),
  run(payData) {
    if(payData.sub == 'basic'){
      debitedFounds = 1500;
      creditedFunds = 1300;
      fees = 200;
    } else if(payData.sub == 'premium'){
      debitedFounds = 4500;
      creditedFunds = 4000;
      fees = 500;
    }

    customTag = {pet_id:payData.pet_id};
    customTagString = EJSON.stringify(customTag);

    if(!Meteor.user().mangopay)
      throw new Meteor.Error('NO_MANGOPAY_ACCOUNT', 'No mangopay account', 'l\'utilisateur n\'a pas de compte use mangopay');


    // TODO get ici le author id pour éviter les truc bizarre

    console.log("paiementToKemonoWallet");
      const payin = {
      "Tag": customTagString,
      "AuthorId": Meteor.user().mangopay.user_id, // user id chez mangopay
      "CreditedUserId": "24898802", // kemono user id for sandbox
      "DebitedFunds": {
        "Currency": "EUR",
        "Amount": debitedFounds
      },
      "CreditedFunds": {
        "Currency": "EUR",
        "Amount": creditedFunds
      },
      "Fees": {
        "Currency": "EUR",
        "Amount": fees
      },
      "ReturnURL": "http://localhost:3000/",
      "CreditedWalletId": "24944941",  // kemono wallet id for sandbox
      "CardType": "CB_VISA_MASTERCARD",
      "SecureMode": "DEFAULT",
      "Culture": "FR", // language
      "PaymentType": "CARD",
      "ExecutionType": "WEB",
    };


    let future = new Future();
    MangoPayApi.PayIns.create(payin, (result)=>{
        future.return(result);
    });
    return future.wait();
  }
});




const initPaiementRegistration = new ValidatedMethod({
  name: 'initPaiementRegistration',
  validate: null,
  run(subscription) {

    console.log("initPaiementRegistration");
    if(subscription == 'basic'){
      debitedFounds = 1500;
      creditedFunds = 1300;
      fees = 200;
    } else if(subscription == 'premium'){
      debitedFounds = 4500;
      creditedFunds = 4000;
      fees = 500;
    }

    const payin = {
    "AuthorId": Meteor.user().mangopay.user_id, // user id chez mangopay
    "CreditedUserId": "24898802", // kemono user id for sandbox
    "DebitedFunds": {
      "Currency": "EUR",
      "Amount": debitedFounds
    },
    "CreditedFunds": {
      "Currency": "EUR",
      "Amount": creditedFunds
    },
    "Fees": {
      "Currency": "EUR",
      "Amount": fees
    },
    "CreditedWalletId": "24944941",  // kemono wallet id for sandbox
    "CardId": Meteor.user().mangopay.card.id,
    "SecureMode": "DEFAULT",
    "PaymentType":"CARD",
    "ExecutionType": "DIRECT",
    "SecureModeReturnURL":"localhost:3000"
  };

  let future = new Future();
  MangoPayApi.PayIns.create(payin, (result)=>{
    console.log(result);
    console.log(subscription);
  //    future.return(result);
  });
//  return future.wait();
  }
});
