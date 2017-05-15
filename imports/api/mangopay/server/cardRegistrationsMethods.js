import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../../modules/rate-limit.js';

import {MangoPayApi} from './mangoPayApi';
import mangoPay from 'mangopay-cardregistration-js-kit';

import Future from 'fibers/future';


const createCardRegistration = new ValidatedMethod({
  name: 'createCardRegistration',
  validate: null,
  run() {
    console.log("createCardRegistration");
    if(!Meteor.user().mangopay.user_id)
      throw new Meteor.Error("no_mangopay_id", "You don't have a mangopay user id.");

    const cardRegistration = new MangoPayApi.models.CardRegistration({
      "UserId": Meteor.user().mangopay.user_id,
      "Currency": "EUR",
      "CardType": "CB_VISA_MASTERCARD"
    });

    let future = new Future();
    MangoPayApi.CardRegistrations.create(cardRegistration,  function(response) {
      if(response.errors){
        console.log("print error: ");
        console.log(response.errors);
      }else{
        console.log(response);
        ret = {
          CardRegistrationURL: response.CardRegistrationURL,
          PreregistrationData: response.PreregistrationData,
          AccessKey: response.AccessKey,
          Id: response.Id
        }
        future.return(ret);
      }
    });
    return future.wait();
  }
});

const updateCardRegistration = new ValidatedMethod({
  name: 'updateCardRegistration',
  validate: null,
  run() {
    console.log("updateCardRegistration");
    const cardRegistration = new MangoPayApi.models.CardRegistration({
      "Id": '25534280',
      "UserId": Meteor.user().mangopay.user_id,

      "RegistrationData": "data=nyE9OPhlGammVS88Gn2dOwhs1HO6eR3hAIq-iHPnJQI3-FoXLfTL7Y6qUwpkjO4AoJaV4X2ZQ7zZQJk_a0sTjMYCJGTMTkCTkCr8DVAjl4uHQ2H0qqH8lwbKsRRnUvf50ftIYwFxOdfmDQ5GtM_cIg"
    });
    MangoPayApi.CardRegistrations.update(cardRegistration,  function(response) {
      if(response.errors){
        console.log("print error: ");
        console.log(response.errors);
      }else{
        console.log(response);
      }
    });
  }
});

const getCard = new ValidatedMethod({
  name: 'getCard',
  validate: null,
  run() {
    console.log("getCard");
    MangoPayApi.Cards.get('25534491',  function(response) {
      if(response.errors){
        console.log("print error: ");
        console.log(response.errors);
      }else{
        console.log(response);
      }
    });
  }
});
