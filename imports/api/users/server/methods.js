import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../../modules/rate-limit.js';

export const updateUserProfil = new ValidatedMethod({
  name: 'updateUserProfil',
  validate:null,
  run({userProfil}) {
    console.log(userProfil);
    Meteor.users.update(Meteor.userId(), {$set: {profile: userProfil}});
  }
});

rateLimit({
  methods: [
    updateUserProfil,
  ],
  limit: 5,
  timeRange: 1000,
});
