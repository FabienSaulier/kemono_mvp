import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../../modules/rate-limit.js';

import {MangoPayApi} from './mangoPayApi';
import mangoPay from 'mangopay-cardregistration-js-kit';

const createCardRegistration = new ValidatedMethod({
  name: 'createCardRegistration',
  validate: null,
  run() {
    console.log("createCardRegistration");
    const cardRegistration = new MangoPayApi.models.CardRegistration({
      "UserId": Meteor.user().mangopay.user_id,
      "Currency": "EUR",
      "CardType": "CB_VISA_MASTERCARD"
    });
    MangoPayApi.CardRegistrations.create(cardRegistration,  function(response) {
      if(response.errors){
        console.log("print error: ");
        console.log(response.errors);
      }else{
        console.log(response);
      }
    });
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

const registerCard = new ValidatedMethod({
  name: 'registerCard',
  validate: null,
  run() {
    console.log("registerCard");
    mangoPay.cardRegistration.init({
         cardRegistrationURL : "https://homologation-webpayment.payline.com/webpayment/getToken",
         preregistrationData : 'S8HjKhXaPXeNlzbaHMqIv-OWclzgP_EN3XuDm5PyK0bDkPOcaFHhHJIV5wpB08h1S4wCy-yiraxeE65tmxOe8A',
         accessKey : '1X0m87dmM2LiwFgxPLBJ',
         Id : '25534280'
     });

     mangoPay.cardRegistration.baseURL = "https://api.sandbox.mangopay.com";
     mangoPay.cardRegistration.clientId = 'foobinou';


     var cardData = {
          cardNumber: '4706750000000009',
          cardExpirationDate: '1120',
          cardCvx: '888',
          cardType: 'CB_VISA_MASTERCARD'
     };

     mangoPay.cardRegistration.registerCard(
         cardData,
         function(res) {
           console.log("REGISTRATION SUCCESS");
           console.log(res);
             // Success, you can use res.CardId now that points to registered card
         },
         function(res) {
           console.log("REG FAILED");
           console.log(res);
             // Handle error, see res.ResultCode and res.ResultMessage
         }
     );

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
