import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import rateLimit from '../../../modules/rate-limit.js';

import Pets from '../pets';


/**
Update or insert a new Pet.
- upsert Pet
- update user with the created pet Id
**/
export const upsertPet = new ValidatedMethod({
  name: 'pets.upsert',
  validate: Pets.schema.validator(),
  run(pet) {
    console.log(pet);
    const result =  Pets.upsert({ _id: pet._id }, { $set: pet });
    console.log(result);

    if(result.numberAffected && result.numberAffected == 1 && result.insertedId){
      console.log("add "+result.insertedId+" to user pet list");
      const res = Meteor.users.update(Meteor.userId(), {$push: {pets_id: result.insertedId}});
      console.log(res);
    }
  },
});

rateLimit({
  methods: [
    upsertPet,
  ],
  limit: 5,
  timeRange: 1000,
});
