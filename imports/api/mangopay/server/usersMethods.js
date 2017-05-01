import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../../modules/rate-limit.js';
import { Meteor } from 'meteor/meteor';

import mp2 from 'mangopay2-nodejs-sdk';

//import {MangoPayApi} from './mangoPayApi';

const MangoPayApi = new mp2({
    clientId: Meteor.settings.private.MANGOPAY_CLIENT_ID,
    clientPassword: Meteor.settings.private.MANGOPAY_CLIENT_PWD,
    debugMode:false,
    // Set the right production API url. If testing, omit the property since it defaults to sandbox URL
    baseUrl: Meteor.settings.private.BASE_URL,
});

const createMangoPayUser = new ValidatedMethod({
  name: 'createMangoPayUser',
  validate: null,
  run() {
    console.log("createMangoPayUser");
    usrData = Meteor.user().profile;
    const user = new MangoPayApi.models.UserNatural({
      FirstName: usrData.firstName,
      LastName: usrData.lastName,
      Address: new MangoPayApi.models.Address({
          AddressLine1: usrData.address,
          //AddressLine2: ,
          City: usrData.city,
          //Region: ,
          PostalCode: usrData.zipCode,
          Country: 'FR'
      }),
      Birthday: new Date(usrData.birthday).getTime()/1000,
      Nationality: 'FR',
      CountryOfResidence: 'FR',
      //Occupation:'',
      //IncomeRange:'',
      Email:Meteor.user().emails[0].address
    });

    MangoPayApi.Users.create(user,  Meteor.bindEnvironment(function(response) {
      if(response.errors){
        console.log("print error: ");
        console.log(response.errors);
      }else{
        let mpUserId = {mpUserId:response.Id};
        let res =   Meteor.call("updateMangoPUserId", mpUserId);
        console.log(res);
      }
    }));
  }
});
