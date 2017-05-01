import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../../modules/rate-limit.js';

import {MangoPayApi} from './mangoPayApi';

import Future from 'fibers/future';


const testPayin = new ValidatedMethod({
  name: 'testPayin',
  validate: null,
  run() {
    console.log("testPayin");
      const payin = {
      "Tag": "custom meta",
      "AuthorId": "24942064",
      "CreditedUserId": "24898802", // kemono for sandbox
      "DebitedFunds": {
        "Currency": "EUR",
        "Amount": 1200
      },
      "CreditedFunds": {
        "Currency": "EUR",
        "Amount": 1100
      },
      "Fees": {
        "Currency": "EUR",
        "Amount": 100
      },
      "ReturnURL": "http://localhost:3000/",
      "CreditedWalletId": "24944941",  // kemono for sandbox
      "CardType": "CB_VISA_MASTERCARD",
      "SecureMode": "DEFAULT",
      "Culture": "EN",
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
