import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../../modules/rate-limit.js';

import {MangoPayApi} from './mangoPayApi';

import Future from 'fibers/future';


//TODO rename: paiementToKemonoWallet
const paiementToKemonoWallet = new ValidatedMethod({
  name: 'paiementToKemonoWallet',
  validate:  new SimpleSchema({
    sub: { type: String, allowedValues:['basic', 'premium']},
    ok_monthly: { type: Boolean, allowedValues:[true]},
    ok_refound: { type: Boolean, allowedValues:[true]}
  }).validator(),
  run(payData) {


    console.log(payData.sub);
    if(payData.sub == 'basic'){
      debitedFounds = 1500;
      creditedFunds = 1300;
      fees = 200;
    } else if(payData.sub == 'premium'){
      debitedFounds = 4500;
      creditedFunds = 4000;
      fees = 500;
    }

    // TODO get ici le author id pour éviter les truc bizarre

    console.log("paiementToKemonoWallet");
      const payin = {
      "Tag": "custom meta",
      "AuthorId": "24942064", // user id chez mangopay
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
