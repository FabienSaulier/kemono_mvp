import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../../modules/rate-limit.js';

const updateMangoPUserId = new ValidatedMethod({
  name: "updateMangoPUserId",
  validate: new SimpleSchema({
    mpUserId:{type:String}
  }).validator(),
  run({mpUserId}) {
    return Meteor.users.upsert(Meteor.userId(), {$set: {'mangop.user_id': mpUserId}});
  }
});

const updateMangoPUserWalletId = new ValidatedMethod({
  name: "updateMangoPUserWalletId",
  validate: new SimpleSchema({
    mpWalleterId:{type:String}
  }).validator(),
  run({mpWalleterId}) {
    return Meteor.users.upsert(Meteor.userId(), {$set: {'mangop.wallet_id': mpWalleterId}});
  }
});

export const sendVerificationLink = new ValidatedMethod({
  name: 'sendVerificationLink',
  validate: null,
  run() {
    let userId = Meteor.userId();
    if (userId) {
      return Accounts.sendVerificationEmail(userId);
    }
  }
});

export const updateUserProfile = new ValidatedMethod({
  name: 'updateUserProfile',
  validate: new SimpleSchema({
      firstName: {
        type: String,
        min:3
      },
      lastName: {
        type: String,
        min:3
      },
      sex:{
        type:String,
        allowedValues: ['man', 'woman']
      },
      birthday:{
        type: Date
      },
      picture:{
        type: String,
        optional: true
      },
      phone:{
        type: String,
        optional: true
      },
      address: {
        type: String,
        max: 100,
        min:3
      },
      city: {
        type: String,
        max: 50,
        min:3
      },
      country: {
        type: String
      },
      zipCode: {
        type: String,
        regEx: SimpleSchema.RegEx.ZipCode
      },
      description:{
        type:String,
        optional:true
      }
  }).validator(),
  run(userToUpdate) {
    console.log(userToUpdate);
    Meteor.users.update(Meteor.userId(), {$set: {profile: userToUpdate}});
  }
});

rateLimit({
  methods: [
    updateUserProfile,
  ],
  limit: 5,
  timeRange: 1000,
});
