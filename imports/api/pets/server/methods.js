import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../../modules/rate-limit.js';

import Pets from '../pets';

export const upsertPet = new ValidatedMethod({
  name: 'pets.upsert',
  validate: Pets.schema.validator(),
  run(pet) {
    console.log(pet);
    return Pets.upsert({ _id: pet._id }, { $set: pet });
  },
});

rateLimit({
  methods: [
    upsertPet,
  ],
  limit: 5,
  timeRange: 1000,
});
